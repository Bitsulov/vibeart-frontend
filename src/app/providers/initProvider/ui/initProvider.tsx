import { useEffect } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage, selectCurrentLanguage } from "entities/appConfig";
import { setUserInfo } from "entities/user";
import { useLocation, useNavigate, useMatches } from "react-router-dom";
import { supportedLangs, defaultLang } from "shared/const/const";
import { useQuery } from "@tanstack/react-query";
import { getPrincipalUser } from "entities/user";
import { showToast } from "features/toast";
import axios from "axios";
import type { AppError } from "shared/lib/types";

/** Свойства компонента {@link InitProvider}. */
interface InitProviderProps {
    /** Дочернее дерево, монтируемое после завершения инициализации. */
    children: ReactNode;
}

/**
 * <h1>Провайдер инициализации приложения.</h1>
 *
 * <h2>Назначение</h2>
 * <ol>
 *     <li>
 *         **Инициализация пользователя.** При монтировании получает данные текущего пользователя
 *         с сервера ({@link PrincipalUserState}) и записывает данные
 *         авторизованного пользователя в Redux-хранилище через {@link setUserInfo}.
 *     </li>
 *    <li>
 *         **Синхронизация языка с URL.** При каждом изменении пути проверяет
 *         языковой сегмент URL и приводит состояние приложения к согласованному
 *         виду в следующем порядке:
 *         <ul>
 *             <li>
 *                 Если языковой сегмент отсутствует, выполняется навигация с добавлением
 *                 языка из текущего экземпляра i18n.
 *             </li>
 *            <li>
 *                 Если языковой сегмент не входит в список поддерживаемых, выполняется
 *                 навигация с заменой сегмента на `"en"`.
 *             </li>
 *            <li>
 *                 Если языковой сегмент отличается от значения в Redux, Redux и i18n
 *                 синхронизируются с URL.
 *             </li>
 *            <li>
 *                 Если все значения совпадают, обновляется атрибут `lang` тега `<html>`.
 *             </li>
 *         </ul>
 *     </li>
 * </ol>
 * <p>
 *     Языковой сегмент извлекается из совпадающих маршрутов через
 *     {@link useMatches}, что надёжнее прямого разбора `pathname`, так как
 *     учитывает, является ли первый сегмент именованным параметром `:lang`.
 * </p>
 *
 * @param props - Свойства компонента.
 * @param props.children - Дочернее дерево, отрисовываемое внутри провайдера.
 */
export const InitProvider = ({ children }: InitProviderProps) => {
    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    const lang = useSelector(selectCurrentLanguage);
    const { pathname } = useLocation();
    const navigate = useNavigate();

    // Возвращает текущие активные маршруты
    const matchesUrls = useMatches();

    // Возвращает код текущего языка из пути текущего маршрута
    const urlLangParam = matchesUrls
        .map(m => m.params["lang"])
        .find(l => l !== undefined);

    const { data, error } = useQuery({
        queryKey: ["user"],
        queryFn: getPrincipalUser
    });

    useEffect(() => {
        if (data) {
            const user = data.data;
            dispatch(
                setUserInfo({
                    UUID: user.uuid,
                    email: user.email,
                    name: user.name,
                    username: user.username,
                    avatarUrl: user.avatarUrl,
                    role: user.role,
                    isBlocked: !user.enabled,
                    isAuthenticated: true
                })
            );
        }
    }, [data, dispatch]);

    useEffect(() => {
        if (!error) return;

        if (axios.isAxiosError<AppError>(error)) {
            if (!error.response) {
                dispatch(showToast({ message: "api.networkError", type: "error" }));
                return;
            }
            if (error.response.status === 401 || error.response.status === 404) {
                return;
            }
            dispatch(showToast({ message: "api.serverError", type: "error" }));
        } else {
            console.error(error);
        }
    }, [error, dispatch]);

    useEffect(() => {
        // Заход на сайт без определенного языка
        if (urlLangParam === undefined) {
            navigate(`/${i18n.language}${pathname}`, { replace: true });
            // Язык не поддерживается
        } else if (!supportedLangs.includes(urlLangParam)) {
            navigate(`/${defaultLang}${pathname.slice(1 + urlLangParam.length)}`, {
                replace: true
            });
            // Сохранённый язык не совпадает с URL
        } else if (urlLangParam !== lang) {
            // Смена языка в интерфейсе
            if (i18n.language === lang) {
                navigate(`/${lang}${pathname.slice(1 + urlLangParam.length)}`, {
                    replace: true
                });
                // Первый заход, redux еще не синхронизирован
            } else {
                dispatch(setLanguage(urlLangParam));
                i18n.changeLanguage(urlLangParam).catch(er =>
                    console.error("Change language error:", er)
                );
                document.documentElement.lang = urlLangParam;
            }
        } else {
            document.documentElement.lang = lang;
        }
    }, [pathname, urlLangParam, lang, dispatch, i18n, navigate]);

    return <>{children}</>;
};
