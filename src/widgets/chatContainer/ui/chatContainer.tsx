import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import classes from "./chatContainer.module.scss";
import { MessageItem } from "features/messageItem";
import { formatTime2Nums } from "shared/lib/formatTime2Nums";
import { formatDate } from "shared/lib/formatDate";
import { checkShowDate } from "../helpers/checkShowDate";
import { useScrollTo } from "shared/hooks/useScrollTo";
import { ChatForm } from "features/chatForm";
import { sendMessageHandler } from "../model/sendMessageHandler";
import { ChatSettingsButton } from "features/chatSettingsButton";
import type { MessageType } from "entities/message";
import type { UserType } from "entities/user";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ChatContainerPropsType {
    messages: MessageType[];
    setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
    userInfo: UserType;
}

const ChatContainer = ({ messages, setMessages, userInfo, ...props }: ChatContainerPropsType) => {
	const { t } = useTranslation();

    const [inputValue, setInputValue] = useState("");
    const messagesEnd = useRef<HTMLDivElement | null>(null);
    const chat = useRef(null);

    useScrollTo(messagesEnd, [messages]);

    return (
        <div className={classes.chat__container} {...props}>
            <div className={classes.chat__header}>
                <div className={classes.chat__user}>
					<Link to={"/messages"}>
						<ArrowLeft className={classes.chat__back} />
					</Link>
                    <Link to={`/profile/${userInfo.id}`}>
                        <img src={userInfo.srcImg} alt={t("Avatar")} className={classes.chat__userAvatar}></img>
                    </Link>
                    <div className={classes.chat__userInfo}>
                        <Link to={`/profile/${userInfo.id}`} className={classes.chat__userName}>
                            <h2>{`${userInfo.firstName} ${userInfo.secondName}`}</h2>
                        </Link>
                        {userInfo.status === "online" ? (
                            <span className={`${classes.chat__userOnlineStatus} ${classes.online}`}>{t("online")}</span>
                        ) : (
                            <span className={classes.chat__userOnlineStatus}>{t("offline")}</span>
                        )}
                    </div>
                </div>
                <ChatSettingsButton />
            </div>
            <div className={classes.chat__messages} ref={chat}>
                {messages.length > 0 ? (
                    messages.map((message, i) => {
                        if (!message) return null;
                        const messageDate = new Date(message.time);
                        const prevMessage = i > 0 ? messages[i - 1] : null;
                        const prevMessageDate = prevMessage ? new Date(prevMessage.time) : null;

                        const messageTime = formatTime2Nums(messageDate);
                        const dateText = formatDate(messageDate);
                        const showDate = checkShowDate(messageDate, prevMessageDate);
                        return (
                            <div
                                key={message.id}
                                className={classes.chat__messageWrapper}
                                style={i === 0 ? { marginTop: "auto" } : {}}
                            >
                                <div
                                    style={i === 0 ? { marginTop: 0 } : {}}
                                    className={
                                        showDate
                                            ? classes.chat__messageBr
                                            : `${classes.chat__messageBr} ${classes.hide}`
                                    }
                                >
                                    {dateText}
                                </div>
                                <MessageItem
                                    isNew={message.isNew}
                                    text={message.text}
                                    time={messageTime}
                                    type={message.type}
                                    status={message?.status}
                                />
                            </div>
                        );
                    })
                ) : (
                    <h1 className={classes.chat__messagesTitle}>{t("emptyChatTitle")}</h1>
                )}
                <div className={classes.chat__messagesEnd} ref={messagesEnd}></div>
            </div>
            <ChatForm
                inputValue={inputValue}
                setInputValue={setInputValue}
                onSubmit={e => sendMessageHandler(e, inputValue, setInputValue, messages, setMessages, chat)}
            />
        </div>
    );
};

export { ChatContainer };
