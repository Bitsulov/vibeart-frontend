import c from "./homeReviews.module.scss";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {selectCurrentLanguage} from "entities/appConfig";
import {reviewsImgConfig} from "../config/reviewsImgConfig";
import reviewsImgEn from "shared/icons/img-reviews-en.png";

export const HomeReviews = ({ ...props }) => {
    const { t } = useTranslation();
    const currentLanguage = useSelector(selectCurrentLanguage);
    const reviewsImg = reviewsImgConfig[currentLanguage] || reviewsImgEn;

	return (
		<section className={c.reviews} {...props}>
			<div className="container">
                <h2 className={c.title}>{t("home.reviewsTitle")}</h2>
            </div>
            <img
                width="320"
                height="143"
                loading="lazy"
                decoding="async"
                src={reviewsImg}
                alt={t("home.altReviews")}
                className={c.reviewsImg}
            />
		</section>
	)
}
