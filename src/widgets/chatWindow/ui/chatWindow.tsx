import c from "./chatWindow.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Ellipsis } from "lucide-react";
import { useTranslation } from "react-i18next";
import defaultAvatar from "shared/icons/icon-user.svg";
import { MessagesForm } from "features/messagesForm";
import { Fragment, useEffect, useMemo, useRef, useState } from "react";
import type { MessageType } from "entities/message";
import { MessageItem } from "features/messageItem";
import { ChatDate } from "features/chatDate";
import clsx from "clsx";
import { onlineStatusesConfig } from "../config/onlineStatusesConfig";
import { useFillHeight } from "../hooks/useFillHeight";
import { Dropdown } from "features/dropdown";
import { chatOptionsConfig } from "../config/chatOptions";
import { toggleChatSettingsClickHandler } from "../model/toggleChatSettingsClickHandler";
import { ConfirmModal } from "widgets/confirmModal";
import { deleteChatConfirmClickHandler } from "../model/deleteChatConfirmClickHandler";

/** Свойства компонента {@link ChatWindow}. */
interface ChatWindowProps {
    /** Отображаемое имя собеседника. */
    name: string;
    /** UUID собеседника — используется для формирования ссылки на его профиль. */
    UUID: string;
    /** URL аватара собеседника. При отсутствии отображается заглушка. */
    avatarUrl?: string;
    /** Статус присутствия собеседника в сети. */
    onlineStatus: "ONLINE" | "OFFLINE";
    /** Начальный список сообщений диалога, загруженных с сервера. */
    messages: MessageType[];
}

/**
 * Окно диалога с лентой сообщений, формой отправки и меню настроек чата.
 *
 * Хранит сообщения в локальном состоянии, что позволяет оптимистично добавлять
 * новые через {@link MessagesForm}. Список автоматически прокручивается вниз
 * при появлении нового сообщения. Разграничители по дням вставляются через {@link ChatDate}.
 * Высота секции вычисляется хуком {@link useFillHeight}, чтобы занять оставшееся пространство экрана.
 */
export const ChatWindow = ({
    messages,
    name,
    UUID,
    avatarUrl = "",
    onlineStatus,
    ...props
}: ChatWindowProps) => {
    const { t } = useTranslation();
    const { ref, height } = useFillHeight<HTMLElement>();
    const navigate = useNavigate();

    const options = chatOptionsConfig.map(option => ({
        ...option,
        text: option.text(t),
        color: option.color(),
        ariaLabel: option.ariaLabel?.(t),
        onClick: () => option.onClick(setIsShowDeleteChatModal)
    }));

    const [messagesList, setMessagesList] = useState<MessageType[]>(messages);
    const messagesRef = useRef<HTMLDivElement>(null);
    const [isOpenOptions, setIsOpenOptions] = useState<boolean>(false);

    const [isShowDeleteChatModal, setIsShowDeleteChatModal] = useState<boolean>(false);

    useEffect(() => {
        messagesRef.current?.scrollTo({ top: messagesRef.current.scrollHeight });
    }, [messagesList]);

    const isExistsMessages = useMemo(() => {
        return messagesList && messagesList.length > 0;
    }, [messagesList]);

    return (
        <section
            ref={ref}
            className={c.chat}
            style={height ? { height } : undefined}
            {...props}
        >
            <ConfirmModal
                isShowModal={isShowDeleteChatModal}
                setIsShowModal={setIsShowDeleteChatModal}
                text={t("modal.deleteChat")}
                ariaLabelConfirm={t("ariaLabel.deleteMessages")}
                confirmFn={() => deleteChatConfirmClickHandler(navigate)}
            />
            <div className={c.chat_inner}>
                <div className={c.top}>
                    <Link
                        aria-label={t("ariaLabel.goToChats")}
                        to="/chats"
                        className={c.back}
                    >
                        <ArrowLeft
                            className={c.arrow}
                            strokeWidth="1"
                            width="20"
                            height="20"
                        />
                    </Link>
                    <Link
                        className={clsx(c.link, onlineStatus === "ONLINE" && c.online)}
                        aria-label={t("ariaLabel.goToUserProfile", { name: name })}
                        to={`/profile/${UUID}`}
                    >
                        <img
                            src={avatarUrl || defaultAvatar}
                            alt={name}
                            className={c.avatar}
                        />
                    </Link>
                    <div className={c.text}>
                        <Link
                            className={c.link}
                            aria-label={t("ariaLabel.goToUserProfile", { name: name })}
                            to={`/profile/${UUID}`}
                        >
                            <h1 className={c.name}>{name}</h1>
                        </Link>
                        <p
                            className={clsx(
                                c.online_status,
                                onlineStatus === "ONLINE" && c.online
                            )}
                        >
                            {t(onlineStatusesConfig[onlineStatus])}
                        </p>
                    </div>
                    <div className={c.settings_wrapper}>
                        <button
                            aria-expanded={isOpenOptions}
                            aria-controls="dropdown"
                            aria-label={
                                isOpenOptions
                                    ? t("ariaLabel.closeChatSettings")
                                    : t("ariaLabel.openChatSettings")
                            }
                            onClick={() =>
                                toggleChatSettingsClickHandler(setIsOpenOptions)
                            }
                            className={c.chat_settings}
                        >
                            <Ellipsis
                                className={c.settings_icon}
                                strokeWidth="2"
                                width="25"
                                height="25"
                            />
                        </button>
                        <Dropdown
                            setIsOpen={setIsOpenOptions}
                            className={c.dropdown}
                            options={options}
                            isOpen={isOpenOptions}
                            id="dropdown"
                        />
                    </div>
                </div>
                <div ref={messagesRef} className={c.messages}>
                    {isExistsMessages ? (
                        messagesList.map((message, i) => {
                            const prev = messagesList[i - 1];
                            const isDifferentDay =
                                !prev ||
                                new Date(message.createdAt).toDateString() !==
                                    new Date(prev.createdAt).toDateString();

                            return (
                                <Fragment key={i}>
                                    {isDifferentDay && (
                                        <ChatDate date={message.createdAt} />
                                    )}
                                    <MessageItem
                                        status={message.status}
                                        date={message.createdAt}
                                        text={message.text}
                                        isYour={message.isYour}
                                        isNew={message.isNew}
                                    />
                                </Fragment>
                            );
                        })
                    ) : (
                        <h2 className={c.empty}>{t("chat.empty")}</h2>
                    )}
                </div>
                <MessagesForm setMessages={setMessagesList} />
            </div>
        </section>
    );
};
