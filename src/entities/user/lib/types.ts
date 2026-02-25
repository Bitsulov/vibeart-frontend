import type {Roles} from "entities/role";

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
    createdAt: string;
    trustStatus: "trust" | "untrust";
    isBlocked: boolean;
    onlineStatus: "online" | "offline";
    role: Roles;
    avatarUrl: string;
}
