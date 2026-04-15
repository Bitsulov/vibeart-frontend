import type {IMessagesForm} from "../lib/types";
import React from "react";
import {createMessage, type MessageType} from "entities/message";
import type {UseFormSetValue} from "react-hook-form";

export function submitValidHandler(
    data: IMessagesForm,
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>,
    setValue: UseFormSetValue<IMessagesForm>,
) {
    setMessages(messages => [
        ...messages,
        createMessage({id: Date.now(), text: data.sendMessage, createdAt: new Date().toISOString(), isYour: true, isNew: true, status: "save"})
    ]);
    setValue("sendMessage", "");
}
