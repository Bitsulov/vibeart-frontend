import classes from "./notificationsList.module.scss";
import { formatTime } from "shared/lib/formatTime";
import { NotificationItem } from "features/notificationItem";
import type { NotificationType } from "entities/notification";
import { useTranslation } from "react-i18next";

interface NotificationsListPropsType {
    noticesList: NotificationType[];
}

const NotificationsList = ({ noticesList, ...props }: NotificationsListPropsType) => {
	const { t } = useTranslation();

    return (
        <section className={classes.notifications__list} {...props}>
            {noticesList.length ? (
                noticesList.map(notice => {
                    const noticeDate = Date.parse(notice.date);
                    const resultDate = formatTime(Date.now(), noticeDate);
                    return (
                        <NotificationItem
                            id={notice.id}
                            authorName={notice.authorName}
                            authorId={notice.authorId}
                            noticeType={notice.noticeType}
                            date={resultDate}
                            srcImg={notice.srcImg}
                            key={`notice${notice.id}`}
                            postName={notice.postName}
                            postId={notice.postId}
                        />
                    );
                })
            ) : (
                <h2 className={classes.notifications__subtitle}>{t("emptyNotificationsTitle")}</h2>
            )}
        </section>
    );
};

export { NotificationsList };
