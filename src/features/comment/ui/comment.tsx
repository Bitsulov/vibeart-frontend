import c from "./comment.module.scss";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {getLocalTimeAgoString} from "shared/lib/getLocalTimeAgoString";
import {useSelector} from "react-redux";
import {selectCurrentLanguage} from "entities/appConfig";
import defaultAvatarUrl from "shared/icons/icon-user.svg";

interface CommentProps {
    authorULID: string;
    authorName: string;
    authorAvatarUrl: string;
    text: string;
    date: string
}

export const Comment = ({ text, authorULID, authorName, authorAvatarUrl, date, ...props }: CommentProps) => {
    const { t } = useTranslation();
    const language = useSelector(selectCurrentLanguage);

    const avatar = authorAvatarUrl || defaultAvatarUrl;

	return (
		<div className={c.comment} {...props}>
			<Link
                className={c.profile_link}
                aria-label={t("ariaLabel.goToUserProfile", {name: authorName})}
                to={`/profile/${authorULID}`}
            >
                <img width="35" height="35" src={avatar} alt={authorName} className={c.avatar} />
                <p className={c.name}>{authorName}</p>
            </Link>
            <div className={c.wrapper}>
                <p className={c.text}>{text}</p>
                <p className={c.date}>{getLocalTimeAgoString(language, date)}</p>
            </div>
		</div>
	)
}
