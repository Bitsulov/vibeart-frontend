import c from "./albumAdd.module.scss";
import {PlusCircle} from "lucide-react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

export const AlbumAdd = ({ ...props }) => {
    const { t } = useTranslation();

	return (
        <Link aria-label={t("ariaLabel.goToCreateAlbumPage")} className={c.slide} to="/album/add" {...props}>
            <PlusCircle width="80" height="80" className={c.album_img} />
            <p className={c.title}>{t("Add")}</p>
        </Link>
	)
}
