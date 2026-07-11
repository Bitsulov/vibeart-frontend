import { Layout } from "widgets/layout";
import { HomeIntro } from "widgets/homeIntro";
import { HomeSteps } from "widgets/homeSteps";
import { HomeReviews } from "widgets/homeReviews";
import { HomeCTA } from "widgets/homeCTA";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { selectUserInfo } from "entities/user";

/** Главная страница: Интро, шаги, отзывы и призыв к действию. */
export const Home = () => {
    const { t } = useTranslation();
    const principalUser = useSelector(selectUserInfo);

    return (
        <Layout>
            <title>{t("titles.home")}</title>
            <meta name="description" content={t("description.home")} />
            <meta property="og:title" content={t("titles.home")} />
            <meta property="og:description" content={t("description.home")} />
            <HomeIntro isAuthenticated={principalUser.isAuthenticated} />
            <HomeSteps />
            <HomeReviews />
            <HomeCTA isAuthenticated={principalUser.isAuthenticated} />
        </Layout>
    );
};
