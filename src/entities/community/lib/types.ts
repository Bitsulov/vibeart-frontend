import type {UserType} from "entities/user";
import type {AlbumType} from "entities/album";

export interface CommunityType {
    id: number;
    ULID: string;
    owner: UserType;
    username: string;
    title: string;
    description: string;
    albumsList: AlbumType[];
    posts: number;
    subscribers: number;
    subscribes: number;
    createdAt: string;
    imageUrl: string;
}
