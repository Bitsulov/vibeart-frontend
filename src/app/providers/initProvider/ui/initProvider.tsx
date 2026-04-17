import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {setLanguage} from "entities/appConfig";
import {principalUserMock, setUserInfo} from "entities/user";
import {useLocation, useNavigate} from "react-router-dom";
import {languagesConfig} from "widgets/layout";

interface InitProviderProps {
    children: React.ReactNode;
}

/** Инициализирует Redux-стейт пользователя и синхронизирует язык с URL-параметром `lang`. */
export const InitProvider = ({ children }: InitProviderProps) => {
    const { i18n } = useTranslation();
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(setUserInfo({
            id: principalUserMock.id,
            ULID: principalUserMock.ULID,
            email: principalUserMock.email,
            name: principalUserMock.name,
            username: principalUserMock.username,
            description: principalUserMock.description,
            worksCount: principalUserMock.worksCount,
            subscribersCount: principalUserMock.subscribersCount,
            subscribesCount: principalUserMock.subscribesCount,
            albumList: principalUserMock.albumList,
            createdAt: principalUserMock.createdAt,
            trustStatus: principalUserMock.trustStatus,
            isAuthenticated: principalUserMock.isAuthenticated,
            isBlocked: principalUserMock.isBlocked,
            onlineStatus: principalUserMock.onlineStatus,
            role: principalUserMock.role,
            avatarUrl: principalUserMock.avatarUrl,
        }));
    }, [dispatch]);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const langParam = params.get('lang');

        if(!langParam) {
            const i18nLang = i18n.language.split("-", 1)[0];
            const lang = document.documentElement.lang = languagesConfig[i18nLang]?.[4] || "en";
            dispatch(setLanguage(lang));
            params.set('lang', lang);
            navigate({search: params.toString()}, {replace: true});
        } else {
            document.documentElement.lang = languagesConfig[langParam]?.[4] || "en";
            dispatch(setLanguage(langParam));
            i18n.changeLanguage(langParam)
                .catch((er) => console.error("change language error:", er));
            if(langParam !== document.documentElement.lang) {
                params.set('lang', document.documentElement.lang);
                navigate({search: params.toString()}, {replace: true});
            }
        }
    }, [location, dispatch, i18n, navigate]);

	return (
		<>
            {children}
		</>
	)
}
