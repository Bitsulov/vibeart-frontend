import c from "./backLink.module.scss";
import {ArrowLeft} from "lucide-react";
import {useTranslation} from "react-i18next";
import {returnBackHandler} from "../model/returnBackHandler";
import {useNavigate} from "react-router-dom";

interface BackLinkProps {
    className?: string;
}

export const BackLink = ({ className = "", ...props }: BackLinkProps) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

	return (
        <button
            className={`${c.button} ${className}`}
            onClick={() => returnBackHandler(navigate)}
            aria-label={t("ariaLabel.goBack")}
            {...props}
        >
            <ArrowLeft className={c.back_icon} />
            <span className={c.back_text}>{t("post.back")}</span>
        </button>
	)
}
