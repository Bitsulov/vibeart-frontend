import c from "./postTag.module.scss";
import type {TagType} from "entities/tag";
import React from "react";

interface PostTagProps extends React.HTMLAttributes<HTMLSpanElement | HTMLButtonElement> {
    tag: TagType;
    type?: "default" | "button";
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    ariaLabel?: string;
}

/** Тег поста в виде `#название`. */
export const PostTag = ({
    tag,
    type = "default",
    className = "",
    onClick = () => {},
    ariaLabel = "",
    ...props
}: PostTagProps) => {
    return (
        <>
            {type === "default" &&
                <span className={`${c.tag} ${className}`} {...props}>#{tag.title}</span>
            }
            {type === "button" &&
                <button
                    aria-label={ariaLabel}
                    onClick={onClick}
                    className={`${c.tag} ${c.button} ${className}`}
                    type="button"
                    {...props}
                >
                    #{tag.title}
                </button>
            }
        </>
    );
};
