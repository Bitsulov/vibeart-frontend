import c from "./albumAdd.module.scss";
import { PlusCircle } from "lucide-react";
import { Link, type LinkProps } from "react-router-dom";
import { useTranslation } from "react-i18next";

/** Свойства компонента {@link AlbumAdd}. */
interface AlbumAddProps extends Omit<LinkProps, "to"> {
    /** UUID сообщества, от имени которого будет создан альбом. Если не передан, альбом создаётся от текущего пользователя. */
    communityUUID?: string;
}

/**
 * Ссылка-кнопка для перехода на страницу создания нового альбома.
 *
 * Если передан `communityUUID`, альбом будет создан от имени сообщества.
 */
export const AlbumAdd = ({ communityUUID, ...props }: AlbumAddProps) => {
    const { t } = useTranslation();

    return (
        <Link
            aria-label={t("ariaLabel.goToCreateAlbumPage")}
            className={c.slide}
            to={communityUUID ? `/album/add?community=${communityUUID}` : "/album/add"}
            {...props}
        >
            <PlusCircle width="80" height="80" className={c.album_img} />
            <p className={c.title}>{t("Add")}</p>
        </Link>
    );
};
