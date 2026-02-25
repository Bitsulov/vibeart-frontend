import type {Roles} from "entities/role";
import type {AlbumType} from "entities/album";

export interface UserType {
    id: number;
    ULID: string;
    email: string;
    name: string;
    tag: string;
    description: string;
    worksCount: number;
    subscribersCount: number;
    subscribesCount: number;
    albumList: AlbumType[];
    createdAt: string;
    trustStatus: "trust" | "untrust";
    isBlocked: boolean;
    onlineStatus: "online" | "offline";
    role: Roles;
    avatarUrl: string;
}
