export interface MessageType {
    id: number;
    text: string;
    createdAt: number;
    isYour: boolean;
    status: "save" | "sent" | "read"
}
