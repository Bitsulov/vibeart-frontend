import classes from "./commentButton.module.scss";
import { parseNumber } from "shared/lib/parseNumber";
import { Link } from "react-router-dom";

interface CommentButtonProps {
    count: number;
    href: string;
}

const CommentButton = ({ count, href }: CommentButtonProps) => {
    return (
        <Link className={classes.commentButton} to={href}>
            <svg
                className={classes.commentImg}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M20 2H4C2.89543 2 2 2.89543 2 4V16C2 17.1046 2.89543 18 4 18H8L12 22L16 18H20C21.1046 18 22 17.1046 22 16V4C22 2.89543 21.1046 2 20 2Z"
                    stroke="#333"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            {parseNumber(count)}
        </Link>
    );
};

export { CommentButton };
