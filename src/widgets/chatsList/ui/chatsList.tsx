import c from "./chatsList.module.scss";
import {useTranslation} from "react-i18next";
import {SearchInput} from "features/searchInput";
import {useState} from "react";
import {searchChangeHandler} from "../model/searchChangeHandler";
import type {ChatType} from "entities/chat";
import {ChatItem} from "features/chatItem";

interface ChatListProps {
    chatsList: ChatType[]
}

/** Список чатов с поиском по названию.
 * 
 * @param chatsList - Список чатов.
 * */
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
                    {chatsList.map(chat => (
                        <ChatItem
                            key={`chat ${chat.ULID}`}
                            title={chat.companion.name}
                            ULID={chat.ULID}
                            className={c.chat}
                            imageUrl={chat.companion.avatarUrl}
                            lastMessage={chat.lastMessage.text}
                            date={chat.lastMessage.createdAt}
                        />
                    ))}
                </div>
            </div>
		</section>
	)
}
