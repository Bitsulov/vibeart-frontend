import c from "./stylizedLink.module.scss";
import {Link, type LinkProps} from "react-router-dom";

interface StylizedLinkProps extends Omit<LinkProps, "to"> {
    href: string;
    ariaLabel?: string;
}

/**
 * Ссылка с основным особым стилем кнопки.
 *
 * @param href - Путь для навигации.
 */
export const StylizedLink = ({ className, children, href, ariaLabel, ...props }: StylizedLinkProps) => {
	return (
		<Link className={`${c.link} ${className}`} to={href} aria-label={ariaLabel} {...props}>
            {children}
        </Link>
	)
}
