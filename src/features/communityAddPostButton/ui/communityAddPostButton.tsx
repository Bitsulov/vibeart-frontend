import c from "./communityAddPostButton.module.scss";
import { Link, type LinkProps } from "react-router-dom";
import { useTranslation } from "react-i18next";

/** Свойства компонента {@link CommunityAddPostButton}. */
interface CommunityAddPostButtonProps extends Omit<LinkProps, "to"> {
    /** Дополнительный CSS-класс для корневого элемента. */
    className?: string;
    /** UUID сообщества, от имени которого будет создан пост. */
    communityUUID: string;
}

/** Ссылка-кнопка для перехода на страницу создания поста от имени сообщества (`/post/add?community=:uuid`) */
export const CommunityAddPostButton = ({
    className = "",
    communityUUID,
    ...props
}: CommunityAddPostButtonProps) => {
    const { t } = useTranslation();

    return (
        <Link
            to={`/post/add?community=${communityUUID}`}
            aria-label={t("ariaLabel.goToCreatePostPage")}
            className={`${c.button} ${className}`}
            {...props}
        >
            {t("community.addPost")}
        </Link>
    );
};
