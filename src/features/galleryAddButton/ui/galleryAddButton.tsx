import c from "./galleryAddButton.module.scss";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";

interface GalleryAddButtonProps {
    className?: string;
}

export const GalleryAddButton = ({ className = "", ...props }: GalleryAddButtonProps) => {
    const { t } = useTranslation();

	return (
		<Link
            to="/post/create"
            aria-label={t("ariaLabel.goToCreatePostPage")}
            className={`${c.button} ${className}`}
            {...props}
        >
            {t("gallery.addPost")}
		</Link>
	)
}
