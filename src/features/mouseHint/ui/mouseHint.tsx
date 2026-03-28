import c from "./mouseHint.module.scss";
import {useSelector} from "react-redux";
import {selectText} from "../model/selectors";
import clsx from "clsx";
import {useMousePosition} from "shared/hooks/useMousePosition";

export const MouseHint = ({ ...props }) => {
    const text = useSelector(selectText);

    const mousePosition = useMousePosition();

	return (
		<p
            style={{left: mousePosition.x + 10, top: mousePosition.y - 30}}
            className={clsx(c.hint, text !== "" && c.active)}
            aria-hidden={true}
            {...props}
        >
            {text}
		</p>
	)
}
