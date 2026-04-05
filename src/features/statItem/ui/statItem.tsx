import c from "./statItem.module.scss";
import type {LucideIcon} from "lucide-react";
import React from "react";
import {Link} from "react-router-dom";

interface StatItemProps {
    type?: "link" | "button" | "default",
    href?: string,
    onClick?: React.MouseEventHandler;
    onMouseEnter?: React.MouseEventHandler;
    onMouseLeave?: React.MouseEventHandler;
    ariaLabel?: string;
    Icon: LucideIcon;
    className?: string;
    iconClassName?: string;
    strokeWidth?: number;
    number: number | string;
}

export const StatItem = ({
    type = "default",
    href = "",
    onClick = () => {},
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    ariaLabel = "",
    Icon,
    className = "",
    iconClassName = "",
    strokeWidth = 2,
    number = 0,
    ...props
}: StatItemProps) => {
	return (
        <>
            {type === "default" && (
                <div
                    onMouseLeave={onMouseLeave}
                    onMouseEnter={onMouseEnter}
                    className={`${c.stat_wrapper} ${className}`}
                    {...props}
                >
                    <Icon strokeWidth={strokeWidth} className={`${c.stat_icon} ${iconClassName}`} width="24" height="24" />
                    <p className={c.number}>{number}</p>
                </div>
            )}
            {type === "link" && (
                <Link
                    onMouseLeave={onMouseLeave}
                    onMouseEnter={onMouseEnter}
                    aria-label={ariaLabel}
                    to={href}
                    className={`${c.stat_wrapper} ${className}`}
                    {...props}
                >
                    <Icon strokeWidth={strokeWidth} className={`${c.stat_icon} ${iconClassName}`} width="24" height="24" />
                    <p className={c.number}>{number}</p>
                </Link>
            )}
            {type === "button" && (
                <button
                    onMouseLeave={onMouseLeave}
                    onMouseEnter={onMouseEnter}
                    aria-label={ariaLabel}
                    onClick={onClick}
                    className={`${c.stat_wrapper} ${className}`}
                    {...props}
                >
                    <Icon strokeWidth={strokeWidth} className={`${c.stat_icon} ${iconClassName}`} width="24" height="24" />
                    <p className={c.number}>{number}</p>
                </button>
            )}
        </>
	)
}
