import type {PostType} from "entities/post";

export interface AlbumType {
    id: number;
    ULID: string;
    name: string;
    description: string;
    postCount: number;
    postsList: PostType[];
    imageUrl: string;
    createdAt: string;
}
