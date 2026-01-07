import classes from "./notificationItem.module.scss";
import { LinkWrapper } from "features/linkWrapper";
import { Trans, useTranslation } from "react-i18next";
import { noticeTypes } from "../config/noticeTypes";
import { hrefTypes } from "../config/hrefTypes";
import type { NotificationType } from "entities/notification";

const NotificationItem = ({
	authorName,
	authorId,
	noticeType,
	date,
	srcImg,
	postName,
	postId,
	...props
}: NotificationType) => {
	const { t } = useTranslation();

	return (
		<LinkWrapper
			href={hrefTypes[noticeType]({ authorId, postId })}
			className={classes.notification__item}
			{...props}
		>
			<img src={srcImg} alt={t("Avatar")} className={classes.notification__avatar} />
			<div className={classes.notification__content}>
				<p className={classes.notification__text}>
				<Trans
					i18nKey={noticeTypes[noticeType]}
					values={{ authorName, postName }}
					components={{
						bold: <span className={classes.bold} />,
						span: <span className={classes.link} />,
					}}
				/>
				</p>
				<p className={classes.notification__date}>{date}</p>
			</div>
		</LinkWrapper>
	);
};

export { NotificationItem };
