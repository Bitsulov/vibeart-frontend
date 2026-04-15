import c from "./chatDate.module.scss";
import {useSelector} from "react-redux";
import {selectCurrentLanguage} from "entities/appConfig";
import {getResultDay} from "../lib/getResultDay";

interface ChatDateProps {
    date: string
}

export const ChatDate = ({ date, ...props }: ChatDateProps) => {
    const currentLanguage = useSelector(selectCurrentLanguage);

	return (
		<div className={c.date} {...props}>
			<p className={c.text}>{getResultDay(currentLanguage, date)}</p>
		</div>
	)
}
