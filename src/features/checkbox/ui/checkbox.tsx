import c from "./checkbox.module.scss";
import type {ReactNode} from "react";
import clsx from "clsx";

interface CheckboxProps {
    id: string;
    className?: string;
    children: string | ReactNode;
    isError: boolean;
    ariaLabel?: string;
    describedId?: string;
}

export const Checkbox = ({ describedId, ariaLabel, id, className = "", children, isError, ...props }: CheckboxProps) => {
	return (
        <label className={`${c.wrapper} ${className}`} htmlFor={id} {...props}>
            <input
                aria-label={ariaLabel}
                aria-invalid={isError ? "true" : "false"}
                aria-describedby={describedId}
                id={id}
                className={c.input}
                type="checkbox"
                name="agreed"
            />
            <span className={clsx(c.custom_box, isError && c.error)} aria-hidden="true"></span>
            <span className={c.text}>{children}</span>
        </label>
	)
}
