import classes from "./tagList.module.scss";
import { tagClickHandler } from "../model/tagClickHandler";
import { useDispatch } from "react-redux";

interface TagType {
    tag: string;
}

const Tag = ({ tag, ...props }: TagType) => {
    const dispatch = useDispatch();

    return (
        <li className={classes.post__tag} onClick={e => tagClickHandler(e, dispatch, tag)} {...props}>
            #{tag}
        </li>
    );
};

export { Tag };
