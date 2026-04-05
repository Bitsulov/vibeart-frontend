import type {UserType} from "entities/user";

export interface CommentType {
    id: number;
    text: string;
    createdAt: string;
    author: UserType;
}
