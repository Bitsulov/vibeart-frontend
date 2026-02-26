import type {UserType} from "entities/user";

export interface CommunityType {
    id: number;
    ULID: string;
    owner: UserType;
    username: string;
    title: string;
    description: string;
    posts: number;
    subscribers: number;
    subscribes: number;
    createdAt: string;
    imageUrl: string;
}
