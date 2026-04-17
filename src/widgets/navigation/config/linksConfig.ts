import {Bell, CircleUser, Images, MessageCircle, Users, UserStar} from "lucide-react";

/** Конфигурация ссылок бокового навигационного меню. */
export const navigationConfig = [
    {
        href: (ULID: string) => `/profile/${ULID}`,
        icon: CircleUser,
        title: "pages.profile",
        ariaLabel: "ariaLabel.goToProfile",
        isAdmin: false,
    },
    {
        href: () => `/gallery`,
        icon: Images,
        title: "pages.gallery",
        ariaLabel: "ariaLabel.goToGallery",
        isAdmin: false,
    },
    {
        href: () => `/chats`,
        icon: MessageCircle,
        title: "pages.messages",
        ariaLabel: "ariaLabel.goToChats",
        isAdmin: false
    },
    {
        href: () => `/notifications`,
        icon: Bell,
        title: "pages.notifications",
        ariaLabel: "ariaLabel.goToNotifications",
        isAdmin: false
    },
    {
        href: () => `/communities`,
        icon: Users,
        title: "pages.communities",
        ariaLabel: "ariaLabel.goToCommunities",
        isAdmin: false
    },
    {
        href: () => `/admin/ban`,
        icon: UserStar,
        title: "pages.administrator",
        ariaLabel: "ariaLabel.goToBan",
        isAdmin: true
    },
];
