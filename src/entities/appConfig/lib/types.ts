export type ServerStatusType = "good" | "problem" | "bad";

export interface AppConfigType {
    currentLanguage: string;
    serverStatus: ServerStatusType;
    unreadChatsCount: number;
    unreadNotificationsCount: number;
}
