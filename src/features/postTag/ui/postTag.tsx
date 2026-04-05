import c from "./postTag.module.scss";
import type {TagType} from "entities/tag";

interface PostTagProps {
    tag: TagType;
}

export const PostTag = ({ tag }: PostTagProps) => {
    return (
        <span className={c.tag}>#{tag.title}</span>
    );
};
