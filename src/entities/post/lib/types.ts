export interface PostType {
    id: number;
    ULID: string;
    name: string;
    description: string;
    likes: number;
    comments: number;
    reports: number;
    checkStatus: "checked" | "unchecked";
    AIStatus: "problem" | "good";
    imageUrl: string;
    createdAt: string;
}
