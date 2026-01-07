import classes from "../ui/chatContainer.module.scss";
import type React from "react";
import type { MessageType } from "entities/message";

export function sendMessageHandler(
    e: React.FormEvent,
    inputValue: string,
    setInputValue: React.Dispatch<React.SetStateAction<string>>,
    messages: MessageType[],
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>,
    chatRef: React.RefObject<HTMLDivElement | null>
) {
    e.preventDefault();
    if (inputValue.trim() !== "" && chatRef.current !== null) {
        setMessages([
            ...messages,
            {
                id: Date.now(),
                type: "outgoing",
                status: "unread",
                text: inputValue,
                time: new Date().toISOString(),
                isNew: true /* Не отправлять в БД */
            }
        ]);
        setInputValue("");
        chatRef.current.classList.add(classes.newMessageAnim);
        setTimeout(() => {
            if (chatRef.current !== null) {
                chatRef.current.classList.remove(classes.newMessageAnim);
            }
        }, 150);
    }
}
