import c from "./footerLinksItem.module.scss";
import {Link, type To, useLocation} from "react-router-dom";
import React from "react";

interface FooterLinksItemProps {
    to: To;
    children?: React.ReactNode;
    ariaLabel: string;
}

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
