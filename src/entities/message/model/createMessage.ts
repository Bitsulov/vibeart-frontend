import type {MessageType} from "../lib/types";

export function createMessage({
    id = 0,
    text = "",
    createdAt = Date.now(),
    isYour,
    status = "save"
}: MessageType) {
    return {
        id,
        text,
        createdAt,
        isYour,
        status,
    }
}
