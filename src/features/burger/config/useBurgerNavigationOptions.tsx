import { useSelector } from "react-redux";
import { selectNotificationsPageNotices, selectMessagesPageNotices } from "entities/notificationsPages";
import { selectUserInfo } from "entities/user";

export const useBurgerNavigationOptions = () => {
    const noticesLength = useSelector(selectNotificationsPageNotices);
    const chatsLength = useSelector(selectMessagesPageNotices);
	const userInfo = useSelector(selectUserInfo);

    return [
        { textKey: "Notices", haveCounter: true, counter: noticesLength, href: "/notifications" },
        { textKey: "Messages", haveCounter: true, counter: chatsLength, href: "/messages" },
        { textKey: "Communities", haveCounter: false, href: "/communities" },
		{ textKey: "Gallery", haveCounter: false, href: "/gallery" },
        { textKey: "Profile", haveCounter: false, href: `/profile/${userInfo.id}` },
    ];
};
