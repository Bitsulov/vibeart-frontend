import c from "./copyButton.module.scss";
import {copyClickHandler} from "../model/copyClickHandler";
import {CopyIcon} from "lucide-react";
import {useTranslation} from "react-i18next";
import {showHint} from "../model/showHint";
import {useDispatch} from "react-redux";
import {hideHint} from "../model/hideHint";
import {useEffect, useState} from "react";
import clsx from "clsx";

interface CopyButtonProps {
    className?: string;
    text: string
}

export const CopyButton = ({
    className,
    text,
    ...props
}: CopyButtonProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [isShowHint, setIsShowHint] = useState<boolean>(false);

    useEffect(() => {
        if(isShowHint) {
            setTimeout(() => {
                setIsShowHint(false);
            }, 800);
        }
    }, [isShowHint]);

	return (
        <button
            aria-label={t("ariaLabel.copy")}
            onMouseEnter={() => showHint(dispatch, t("hint.copy"))}
            onMouseLeave={() => hideHint(dispatch)}
            onClick={() => copyClickHandler(text, setIsShowHint)}
            className={`${c.copy} ${className}`}
            {...props}
        >
            {isShowHint &&
                <span
                    aria-hidden="true"
                    className={clsx(c.copied, isShowHint && c.active)}
                >
                    {t("hint.copied")}
                </span>
            }
            <CopyIcon width="15" height="15" className={c.copy_img} />
        </button>
	)
}
