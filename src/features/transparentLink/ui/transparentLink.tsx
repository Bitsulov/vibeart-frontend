import c from "./transparentLink.module.scss";
import {Link} from "react-router-dom";
import React from "react";

interface TransparentLinkProps {
    href: string;
    ariaLabel?: string;
    children?: React.ReactNode;
    className?: string;
}

export const TransparentLink = ({ className, children, href, ariaLabel, ...props }: TransparentLinkProps) => {
	return (
        <Link className={`${c.link} ${className}`} to={href} aria-label={ariaLabel} {...props}>
            {children}
        </Link>
	)
}
