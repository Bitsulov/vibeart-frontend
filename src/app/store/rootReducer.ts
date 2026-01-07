import { combineReducers } from "redux";
import { modalReducer } from "features/modalWindow";
import { authReducer } from "features/authForm";
import { regReducer } from "features/regForm";
import { headerFormReducer } from "features/headerForm";
import { notificationsPagesReducer } from "entities/notificationsPages";
import { burgerReducer } from "features/burger";
import { footerLinksReducer } from "features/footerLinksList";
import { pageStatsReducer } from "entities/pageStats";
import { noticeReducer } from "features/notice";
import { userReducer } from "entities/user";

export const rootReducer = combineReducers({
    user: userReducer,
    modal: modalReducer,
    headerForm: headerFormReducer,
    notificationsPages: notificationsPagesReducer,
    burger: burgerReducer,
    footerLinks: footerLinksReducer,
    pageStats: pageStatsReducer,
    notice: noticeReducer,
    auth: authReducer,
    reg: regReducer
});
