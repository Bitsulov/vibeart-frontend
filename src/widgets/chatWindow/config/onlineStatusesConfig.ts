import type {UserType} from "entities/user";

/** Соответствие статуса онлайн ключам перевода. */
export const onlineStatusesConfig: Record<UserType["onlineStatus"], string> = {
    "online": "chat.online",
    "offline": "chat.offline"
}
