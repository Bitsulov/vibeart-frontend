export interface MessageType {
    id: number;
    text: string;
    createdAt: string;
    isYour: boolean;
    status: "save" | "sent" | "read"
}
