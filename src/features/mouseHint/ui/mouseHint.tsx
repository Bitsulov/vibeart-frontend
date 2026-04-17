import c from "./mouseHint.module.scss";
import {useSelector} from "react-redux";
import {selectText} from "../model/selectors";
import clsx from "clsx";
import {useMousePosition} from "shared/hooks/useMousePosition";
import {useLayoutEffect, useRef, useState} from "react";
import { getHintPosition } from "../lib/getHintPosition";

/** Всплывающая подсказка, следующая за курсором мыши. Текст задаётся через Redux. */
export const MouseHint = ({ ...props }) => {
    const text = useSelector(selectText);
    const mousePosition = useMousePosition();
    const ref = useRef<HTMLParagraphElement>(null);
    const [position, setPosition] = useState({left: 0, top: 0});

    useLayoutEffect(() => {
        setPosition(getHintPosition(ref, mousePosition));
    }, [mousePosition]);

	return (
		<p
            ref={ref}
            style={{left: position.left, top: position.top}}
            className={clsx(c.hint, text !== "" && c.active)}
            aria-hidden={true}
            {...props}
        >
            {text}
		</p>
	)
}
