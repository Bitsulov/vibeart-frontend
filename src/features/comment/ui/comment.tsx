import c from "./comment.module.scss";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getLocalTimeAgoString } from "shared/lib/getLocalTimeAgoString";
import { useSelector } from "react-redux";
import { selectCurrentLanguage } from "entities/appConfig";
import defaultAvatarUrl from "shared/icons/icon-user.svg";

/** Свойства компонента {@link Comment}. */
interface CommentProps {
    /** UUID автора для формирования ссылки `/profile/:uuid`. */
    authorUUID: string;
    /** Отображаемое имя автора комментария. При пустом значении отображается `authorUUID`. */
    authorName: string;
    /** URL аватара автора. При отсутствии подставляется иконка-заглушка. */
    authorAvatarUrl: string;
    /** Текст комментария. */
    text: string;
    /** Дата публикации в формате ISO 8601. Отображается как относительное время (например, «2 часа назад»). */
    date: string;
}

/**
 * Один комментарий к публикации.
 *
 * Отображает аватар автора со ссылкой на профиль, имя, текст
 * и относительное время публикации, локализованное через {@link getLocalTimeAgoString}.
 */
export const Comment = ({
    text,
    authorUUID,
    authorName,
    authorAvatarUrl,
    date,
    ...props
}: CommentProps) => {
    const { t } = useTranslation();
    const language = useSelector(selectCurrentLanguage);

    const avatar = authorAvatarUrl || defaultAvatarUrl;
    const resultAuthorName = authorName || authorUUID;

    return (
        <div className={c.comment} {...props}>
            <Link
                className={c.profile_link}
                aria-label={t("ariaLabel.goToUserProfile", { name: resultAuthorName })}
                to={`/profile/${authorUUID}`}
            >
                <img
                    width="35"
                    height="35"
                    src={avatar}
                    alt={resultAuthorName}
                    className={c.avatar}
                />
                <p className={c.name}>{resultAuthorName}</p>
            </Link>
            <div className={c.wrapper}>
                <p className={c.text}>{text}</p>
                <p className={c.date}>{getLocalTimeAgoString(language, date)}</p>
            </div>
        </div>
    );
};
