export interface AppConfigType {
    currentLanguage: string;
    serverStatus: "good" | "problem" | "bad";
    unreadChatsCount: number;
    unreadNotificationsCount: number;
}
