import { useEffect, useState } from "react";
import classes from "./chatsItem.module.scss";
import { Link } from "react-router-dom";
import { formatTime } from "shared/lib/formatTime";
import type { ChatType } from "entities/chats";

const ChatsItem = ({ id, title, srcImg, alt, lastMessage, date, ...props }: ChatType) => {
    const [resultDate, setResultDate] = useState("");

    useEffect(() => {
        const chatDate = Date.parse(date);
        const timeAgo = formatTime(Date.now(), chatDate);
        setResultDate(timeAgo);
    }, [date]);

    return (
        <Link to={`/messages/${id}`} className={classes.chats__item} {...props}>
            <img src={srcImg} alt={title} className={classes.chats__itemAvatar}></img>
            <div className={classes.chats__itemInfo}>
                <p className={classes.chats__itemName}>{title}</p>
                <p className={classes.chats__itemLastMessage}>{lastMessage}</p>
            </div>
            <span className={classes.chats__itemTime}>{resultDate}</span>
        </Link>
    );
};

export { ChatsItem };
