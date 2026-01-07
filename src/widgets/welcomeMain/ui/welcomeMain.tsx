import classes from "./welcomeMain.module.scss";
import { AuthButton } from "features/authButton";
import { RegButton } from "features/regButton";
import { useTranslation } from "react-i18next";

const WelcomeMain = () => {
	const { t } = useTranslation();

    return (
        <section className={classes.welcome}>
            <h1 className={classes.welcome__title}>{t("welcomeTitle")}</h1>
            <p className={classes.welcome__description}>
                {t("welcomeDescription")}
            </p>
            <div className={classes.welcome__buttons}>
                <AuthButton />
                <RegButton />
            </div>
        </section>
    );
};

export { WelcomeMain };
