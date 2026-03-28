import c from "./profileLink.module.scss";
import {Link} from "react-router-dom";
import {MessageCircle, Settings} from "lucide-react";
import {useTranslation} from "react-i18next";

interface ProfileLinkProps {
    isPrincipalUser: boolean;
    name: string;
    ULID: string;
}

export const ProfileLink = ({ isPrincipalUser, name, ULID, ...props }: ProfileLinkProps) => {
    const { t } = useTranslation();

	return (
		<>
            {isPrincipalUser ?
                <Link
                    aria-label={t("ariaLabel.goToSettings")}
                    to="/settings"
                    className={c.settings_wrapper}
                    {...props}
                >
                    <Settings className={c.settings} width="31" height="31" />
                </Link>
                :
                <Link
                    aria-label={t("ariaLabel.writeUser", {name: name})}
                    to={`/chats/${ULID}`}
                    className={c.messages_wrapper}
                    {...props}
                >
                    <MessageCircle className={c.message} width="31" height="31" />
                </Link>
            }
		</>
	)
}
