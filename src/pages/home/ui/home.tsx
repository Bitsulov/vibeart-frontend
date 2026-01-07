import classes from "./home.module.scss";
import { AuthModal } from "widgets/authModal";
import { WelcomeMain } from "widgets/welcomeMain";
import { Layout } from "widgets/layout";
import { useLoadPageStatus } from "entities/pageStats";

const Home = () => {
    const isPageLoaded = useLoadPageStatus();

    return (
        <Layout pageStatus={isPageLoaded}>
            <main className={classes.home}>
                <AuthModal />
                <WelcomeMain />
            </main>
        </Layout>
    );
};

export { Home };
