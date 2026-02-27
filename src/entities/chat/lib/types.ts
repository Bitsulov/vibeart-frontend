import type {UserType} from "entities/user";
import type {MessageType} from "entities/message";

export interface ChatType {
    id: number;
    ULID: string;
    companion: UserType;
    lastMessage: MessageType;
    createdAt: string;
    imageUrl: string;
}
