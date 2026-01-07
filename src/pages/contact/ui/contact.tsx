import classes from "./contact.module.scss";
import { Layout } from "widgets/layout";
import { useLoadPageStatus } from "entities/pageStats";
import { ContactSection } from "widgets/contactSection";

const Contact = () => {
    const isPageLoaded = useLoadPageStatus();

    return (
        <Layout pageStatus={isPageLoaded}>
            <main className={classes.contact}>
                <ContactSection />
            </main>
        </Layout>
    );
};

export { Contact };
