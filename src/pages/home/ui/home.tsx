import {Layout} from "widgets/layout";
import {HomeIntro} from "widgets/homeIntro";
import {HomeSteps} from "widgets/homeSteps";
import {HomeReviews} from "widgets/homeReviews";
import {HomeCTA} from "widgets/homeCTA";
import {useTranslation} from "react-i18next";

/** Главная страница: Интро, шаги, отзывы и призыв к действию. */
export const Home = () => {
    const { t } = useTranslation();

	return (
        <Layout>
            <title>{t("titles.home")}</title>
            <meta name="description" content={t("description.home")} />
            <HomeIntro/>
            <HomeSteps/>
            <HomeReviews/>
            <HomeCTA/>
        </Layout>
    )
}
