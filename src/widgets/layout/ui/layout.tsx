import type React from "react";
import classes from "./layout.module.scss";
import { Header } from "../../header";
import { Footer } from "../../footer";
import { LoaderPage } from "../../loaderPage";
import { Notice } from "features/notice";

interface LayoutPropsType {
    children: React.ReactNode;
    pageStatus: boolean;
}

const Layout = ({ children, pageStatus }: LayoutPropsType) => {
    return (
        <div className={classes.layout}>
            <LoaderPage pageStatus={pageStatus} />
            <Notice />
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export { Layout };
