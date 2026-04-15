import c from "./dropdown.module.scss";
import type {LucideIcon} from "lucide-react";
import React from "react";
import clsx from "clsx";
import {optionClickHandler} from "../model/optionClickHandler";

interface DropdownProps {
    options: {
        icon: LucideIcon;
        text: string;
        color: string;
        ariaLabel?: string;
        onClick: () => void;
    }[];
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    id: string;
    className?: string
}

export const Dropdown = ({
    id = "",
    isOpen,
    setIsOpen,
    options,
    className = "",
    ...props
}: DropdownProps) => {
	return (
		<ul
            id={id ? id : undefined}
            role="menu"
            className={clsx(c.drowdown, className, isOpen && c.open)}
            inert={!isOpen || undefined}
            {...props}
        >
            {options.map(option => {
                const Icon = option.icon;

                return (
                    <li key={option.text} role="menuitem" className={c.option}>
                        <button
                            onClick={() => optionClickHandler(option.onClick, setIsOpen)}
                            aria-label={option.ariaLabel ? option.ariaLabel : undefined}
                            className={c.button}
                            style={{"--option-color": option.color, color: option.color} as React.CSSProperties}
                        >
                            <Icon className={c.icon} color={option.color || "currentColor"} />
                            {option.text}
                        </button>
                    </li>
                )
            })}
		</ul>
	)
}
