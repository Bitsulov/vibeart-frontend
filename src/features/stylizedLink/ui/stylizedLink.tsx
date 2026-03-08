import c from "./stylizedLink.module.scss";
import {Link} from "react-router-dom";
import React from "react";

interface StylizedLinkProps {
    href: string;
    ariaLabel?: string;
    children?: React.ReactNode;
    className?: string;
}

export const StylizedLink = ({ className, children, href, ariaLabel, ...props }: StylizedLinkProps) => {
	return (
		<Link className={`${c.link} ${className}`} to={href} aria-label={ariaLabel} {...props}>
            {children}
        </Link>
	)
}
