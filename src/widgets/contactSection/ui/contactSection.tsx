import { useTranslation } from "react-i18next";
import classes from "./contactSection.module.scss";
import { ContactForm } from "features/contactForm";

const ContactSection = () => {
	const { t } = useTranslation();

    return (
        <section className={classes.contactSection}>
            <h1 className={classes.contactTitle}>{t("Contacts")}</h1>
            <h2 className={classes.contactSubtitle}>{t("ConnectWithUs")}</h2>
            <ContactForm />
        </section>
    );
};

export { ContactSection };
