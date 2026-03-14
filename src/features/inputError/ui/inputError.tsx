import c from "./inputError.module.scss";
import {TriangleAlert} from "lucide-react";
import clsx from "clsx";
import {useTranslation} from "react-i18next";

interface InputErrorProps {
    text?: string;
    className?: string;
    error_id?: string | undefined;
}

export const InputError = ({ error_id, className, text, ...props }: InputErrorProps) => {
    const { t } = useTranslation();

	return (
        <>
            <div className={clsx(c.error, text && c.show, !text && c.hide, className && className)} {...props}>
                <TriangleAlert width="12" height="12" className={c.error_icon} />
                <p id={error_id} className={c.error_text}>{text && t(text)}</p>
            </div>
        </>
	)
}
