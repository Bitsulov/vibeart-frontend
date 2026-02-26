import type {ChatType} from "../lib/types";

export function createChat({
    id = 0,
    ULID,
    companion,
    lastMessage,
    createdAt = new Date().toISOString(),
    imageUrl,
}: ChatType) {
    return {
        id,
        ULID,
        companion,
        lastMessage,
        createdAt,
        imageUrl,
    }
}
