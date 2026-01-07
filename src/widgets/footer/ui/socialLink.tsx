import type { SocialLinkType } from "../model/types";
import classes from "./socialLink.module.scss";
import { Link } from "react-router-dom";

interface SocialLinkPropsType {
    data: SocialLinkType;
}

const SocialLink = ({ data, ...props }: SocialLinkPropsType) => {
    const Img = data.img;

    return (
        <Link target="_blank" className={classes.socialsLink} to={data.href} {...props}>
            <Img />
        </Link>
    );
};

export default SocialLink;
