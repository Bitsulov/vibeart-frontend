import { useRef, useEffect } from "react";
import classes from "./footerLinksList.module.scss";
import { Link } from "react-router-dom";
import { toggleLinksHandler } from "../model/toggleLinksHandler";
import { useSelector, useDispatch } from "react-redux";
import { selectFooterLinksHeight, selectIsFooterLinksOpen, selectOPENFOOTERLINKSHEIGHT } from "../model/selectors";
import { setOpenFooterLinksHeight, setFooterLinksHeight, setIsFooterLinksOpen } from "../model/footerLinksSlice";
import { footerLinksWrapperHandler } from "../model/footerLinksWrapperHandler";
import { footerLinksConfig as links } from "../config/footerLinksConfig";
import { useTranslation } from "react-i18next";

const FooterLinksList = () => {
	const { t } = useTranslation();

    const footerLinksHeight = useSelector(selectFooterLinksHeight);
    const OPENFOOTERLINKSHEIGHT = useSelector(selectOPENFOOTERLINKSHEIGHT);
    const isFooterLinksOpen = useSelector(selectIsFooterLinksOpen);
    const linksRef = useRef<HTMLDivElement>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setOpenFooterLinksHeight(linksRef.current?.scrollHeight));
        dispatch(setFooterLinksHeight(0));
    }, []);

    useEffect(() => {
        dispatch(setIsFooterLinksOpen(false));
    }, [location.pathname]);

    return (
        <div className={classes.footer__links}>
            {links.slice(0, 2).map((link, i) => (
                <Link key={`footerLink${i}`} to={link.href} className={classes.footer__linksLink}>
                    {t(link.textKey)}
                </Link>
            ))}
            {links.length > 2 ? (
                <button
                    className={classes.footer__linksMore}
                    onClick={e => toggleLinksHandler(e, dispatch, footerLinksHeight, OPENFOOTERLINKSHEIGHT)}
                >
                    <div className={classes.moreWrapper}>
                        <p className={classes.moreText}>{t("More")}</p>
                        <div
                            id="arrow"
                            className={isFooterLinksOpen ? `${classes.arrow} ${classes.arrowRotated}` : classes.arrow}
                        ></div>
                    </div>
                    <div
                        className={
                            isFooterLinksOpen
                                ? `${classes.footer__hiddenLinks} ${classes.hiddenLinksShow} ${classes.show}`
                                : `${classes.footer__hiddenLinks}`
                        }
                        style={OPENFOOTERLINKSHEIGHT === null ? {} : { height: footerLinksHeight + "px" }}
                        ref={linksRef}
                        onClick={footerLinksWrapperHandler}
                    >
                        {links.slice(2).map((link, i) => (
                            <Link key={`hiddenLink${i}`} to={link.href} className={classes.hiddenLinksLink}>
                                {t(link.textKey)}
                            </Link>
                        ))}
                    </div>
                </button>
            ) : (
                ""
            )}
        </div>
    );
};

export { FooterLinksList };
