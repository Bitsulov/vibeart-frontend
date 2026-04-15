import {Check, CheckCheck, Clock, type LucideIcon} from "lucide-react";
import type {MessageType} from "entities/message";

export const statusesConfig: Record<MessageType["status"], LucideIcon> = {
    "save": Clock,
    "sent": Check,
    "read": CheckCheck
}
