import type {UserType} from "entities/user";

export const onlineStatusesConfig: Record<UserType["onlineStatus"], string> = {
    "online": "chat.online",
    "offline": "chat.offline"
}
