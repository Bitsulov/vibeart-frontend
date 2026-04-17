import c from "./footerLinksItem.module.scss";
import {Link, type LinkProps, useLocation} from "react-router-dom";

interface FooterLinksItemProps extends LinkProps {
    ariaLabel: string;
}

/** Пункт навигации в футере. */
export const FooterLinksItem = ({
    to,
    children,
    ariaLabel,
    ...props
}: FooterLinksItemProps) => {
    const path = useLocation().pathname;

	return (
        <Link
            aria-label={ariaLabel}
            to={to}
            aria-current={path === to ? "page" : undefined}
            className={c.link}
            {...props}
        >
            {children}
        </Link>
	)
}
