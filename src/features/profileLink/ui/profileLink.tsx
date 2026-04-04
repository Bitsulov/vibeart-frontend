import c from "./profileLink.module.scss";
import {Link} from "react-router-dom";
import {MessageCircle, Settings} from "lucide-react";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {showHint} from "../model/showHint";
import {hideHint} from "../model/hideHint";

interface ProfileLinkProps {
    isPrincipalUser: boolean;
    name: string;
    ULID: string;
}

export const ProfileLink = ({ isPrincipalUser, name, ULID, ...props }: ProfileLinkProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

	return (
		<>
            {isPrincipalUser ?
                <Link
                    aria-label={t("ariaLabel.goToSettings")}
                    to="/settings"
                    className={c.settings_wrapper}
                    onMouseEnter={() => showHint(dispatch, t("hint.settings"))}
                    onMouseLeave={() => hideHint(dispatch)}
                    {...props}
                >
                    <Settings className={c.settings} width="31" height="31" />
                </Link>
                :
                <Link
                    aria-label={t("ariaLabel.writeUser", {name: name})}
                    to={`/chats/${ULID}`}
                    className={c.messages_wrapper}
                    onMouseEnter={() => showHint(dispatch, t("hint.writeMessage"))}
                    onMouseLeave={() => hideHint(dispatch)}
                    {...props}
                >
                    <MessageCircle className={c.message} width="31" height="31" />
                </Link>
            }
		</>
	)
}
