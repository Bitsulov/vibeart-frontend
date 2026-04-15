export interface MessageType {
    id: number;
    text: string;
    createdAt: string;
    isYour: boolean;
    isNew?: boolean;
    status: "save" | "sent" | "read"
}
