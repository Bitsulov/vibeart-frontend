import c from "./communitiesAddButton.module.scss";
import {useTranslation} from "react-i18next";
import {Link, type LinkProps} from "react-router-dom";

interface CommunitiesAddButtonProps extends Omit<LinkProps, "to"> {
    className?: string;
}

/**
 * Ссылка-кнопка для перехода на страницу создания сообщества (`/communities/add`).
 * @param className - дополнительный CSS-класс
 * @param props - остальные пропсы `Link` (кроме `to`)
 */
export const CommunitiesAddButton = ({ className = "", ...props }: CommunitiesAddButtonProps) => {
    const { t } = useTranslation();

    return (
        <Link
            to="/communities/add"
            aria-label={t("ariaLabel.goToCreateCommunityPage")}
            className={`${c.button} ${className}`}
            {...props}
        >
            {t("communities.addCommunity")}
        </Link>
    )
}
