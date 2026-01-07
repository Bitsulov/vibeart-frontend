import { Link } from "react-router-dom";
import classes from "./footer.module.scss";
import logoWhite from "shared/icons/logo-white.png";
import { socialsConfig } from "../config/socialsConfig";
import SocialLink from "./socialLink";
import { FooterLinksList } from "features/footerLinksList";

const Footer = () => {
    return (
        <footer>
            <div className={classes.footer__wrapper}>
                <Link className={classes.footer__logo} to="/gallery">
                    <img src={logoWhite} alt="logo" className={classes.footer__logoImg}></img>
                    <span className={classes.footer__title}>© 2025 VibeArt</span>
                </Link>
                <FooterLinksList />
                <div className={classes.footer__socials}>
                    {Object.entries(socialsConfig).map(([name, social], i) => (
                        <SocialLink data={social} key={`socials${i}`} />
                    ))}
                </div>
            </div>
        </footer>
    );
};

export { Footer };
