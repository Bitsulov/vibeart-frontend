import c from "./transparentLink.module.scss";
import {Link, type LinkProps} from "react-router-dom";

interface TransparentLinkProps extends Omit<LinkProps, "to"> {
    href: string;
    ariaLabel?: string;
}

/**
 * Ссылка с прозрачным вторичным стилем.
 *
 * @param href - Путь для навигации.
 */
export const TransparentLink = ({ className, children, href, ariaLabel, ...props }: TransparentLinkProps) => {
	return (
        <Link className={`${c.link} ${className}`} to={href} aria-label={ariaLabel} {...props}>
            {children}
        </Link>
	)
}
