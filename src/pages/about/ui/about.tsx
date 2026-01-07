import classes from "./about.module.scss";
import { Layout } from "widgets/layout";
import { useLoadPageStatus } from "entities/pageStats";
import { AboutInner } from "widgets/aboutInner";

const About = () => {
    const isPageLoaded = useLoadPageStatus();

    return (
        <Layout pageStatus={isPageLoaded}>
            <main className={classes.about}>
                <AboutInner />
            </main>
        </Layout>
    );
};

export { About };
