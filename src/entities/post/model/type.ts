import type { TagType } from "entities/tag";

export interface PostType {
    id: number;
    title: string;
    description: string;
    authorName: string;
    authorId: number;
    authorUserName: string;
    likes: number;
    comments: number;
    reposts: number;
    date: string;
    srcImg: string;
    srcAuthor: string;
    tags: TagType[];
}
