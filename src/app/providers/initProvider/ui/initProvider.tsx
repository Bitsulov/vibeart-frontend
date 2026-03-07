import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {setLanguage} from "entities/appConfig";
import {principalUserMock, setUserInfo} from "entities/user";
import {useLocation, useNavigate} from "react-router-dom";

interface InitProviderProps {
    children: React.ReactNode;
}

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
    }, []);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const langParam = params.get('lang');

        if(!langParam) {
            const i18nLang = i18n.language.split("-", 1)[0];
            const lang = document.documentElement.lang = i18nLang || "en";
            dispatch(setLanguage(lang));
            params.set('lang', lang);
            navigate({search: params.toString()}, {replace: true});
        } else {
            dispatch(setLanguage(langParam));
            i18n.changeLanguage(langParam)
                .catch((er) => console.error("change language error:", er));
        }
    }, [location.pathname]);

	return (
		<>
            {children}
		</>
	)
}
