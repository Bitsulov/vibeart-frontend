import type {TagType} from "entities/tag";
import type {CommentType} from "entities/comment";
import type {UserType} from "entities/user";

export interface PostType {
    id: number;
    ULID: string;
    name: string;
    description: string;
    author: UserType;
    likes: number;
    comments: number;
    reports: number;
    tagsList: TagType[],
    commentList: CommentType[];
    checkStatus: "checked" | "unchecked";
    AIStatus: "problem" | "good";
    imageUrl: string;
    createdAt: string;
}
