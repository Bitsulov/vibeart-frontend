import type {TagType} from "entities/tag";
import type {CommentType} from "entities/comment";

export interface PostType {
    id: number;
    ULID: string;
    name: string;
    description: string;
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
