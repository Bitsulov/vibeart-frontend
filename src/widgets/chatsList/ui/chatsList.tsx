import c from "./chatsList.module.scss";
import { useTranslation } from "react-i18next";
import { SearchInput } from "features/searchInput";
import { useState } from "react";
import { searchChangeHandler } from "../model/searchChangeHandler";
import type { ChatType } from "entities/chat";
import { ChatItem } from "features/chatItem";

/** Свойства компонента {@link ChatsList}. */
interface ChatListProps {
    /** Список диалогов для отображения. */
    chatsList: ChatType[];
}

/**
 * Боковая панель со списком диалогов и полем поиска по имени собеседника.
 *
 * Фильтрация выполняется локально через {@link searchChangeHandler}.
 * При пустом списке отображается заглушка с локализованным сообщением.
 */
export const ChatsList = ({ chatsList, ...props }: ChatListProps) => {
    const { t } = useTranslation();

    const [searchValue, setSearchValue] = useState("");

    return (
        <section className={c.chats} {...props}>
            <div className={c.chats_inner}>
                <h1 className={c.title}>{t("chats.title")}</h1>
                <SearchInput
                    className={c.search}
                    value={searchValue}
                    onChange={e => searchChangeHandler(e, setSearchValue)}
                />
                <div className={c.list}>
                    {chatsList.length > 0 ? (
                        chatsList.map(chat => (
                            <ChatItem
                                key={`chat ${chat.UUID}`}
                                title={chat.companion.title}
                                UUID={chat.UUID}
                                className={c.chat}
                                imageUrl={chat.companion.avatarUrl}
                                lastMessage={chat.lastMessage.text}
                                date={chat.lastMessage.createdAt}
                            />
                        ))
                    ) : (
                        <h2 className={c.empty}>{t("chats.emptyTitle")}</h2>
                    )}
                </div>
            </div>
        </section>
    );
};
