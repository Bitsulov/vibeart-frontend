import c from "./profileIcons.module.scss";
import {Ban, ShieldX} from "lucide-react";

interface ProfileIconsProps {
    className?: string;
    classNameIcons?: string;
    isBlocked: boolean;
    trustStatus: "trust" | "untrust";
}

export const ProfileIcons = ({
    isBlocked,
    trustStatus,
    className = "",
    classNameIcons = "",
    ...props
}: ProfileIconsProps) => {
	return (
        <div className={`${c.bad_icons} ${className}`} {...props}>
            {isBlocked &&
                <Ban className={`${c.icon} ${c.ban} ${classNameIcons}`} width="24" height="24" />
            }
            {trustStatus === "untrust" &&
                <ShieldX className={`${c.icon} ${c.AI} ${classNameIcons}`} width="24" height="24" />
            }
        </div>
	)
}
