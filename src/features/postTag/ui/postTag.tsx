import c from "./postTag.module.scss";
import type {TagType} from "entities/tag";
import React from "react";

interface PostTagProps extends React.HTMLAttributes<HTMLSpanElement> {
    tag: TagType;
}

/** Тег поста в виде `#название`. */
export const PostTag = ({ tag, ...props }: PostTagProps) => {
    return (
        <span className={c.tag} {...props}>#{tag.title}</span>
    );
};
