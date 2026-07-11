import type { UserType } from "entities/user";

/** Соответствие статуса онлайн ключам перевода. */
export const onlineStatusesConfig: Record<UserType["onlineStatus"], string> = {
    ONLINE: "chat.online",
    OFFLINE: "chat.offline"
};
