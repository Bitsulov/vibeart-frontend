import { useState } from "react";
import { formatSubscribersRu } from "shared/lib/formatSubscribersRu";
import classes from "./communityTopSection.module.scss";
import { formatWorksRu } from "shared/lib/formatWorksRu";
import { parseNumber } from "shared/lib/parseNumber";
import { Users, Image, Copy } from "lucide-react";
import { subscribeHandler } from "../model/subscribeHandler";
import { useDispatch } from "react-redux";
import { communityTagClickHandler } from "../model/communityTagHandler";
import { useTranslation } from "react-i18next";

interface CommunityTopSectionPropsType {
    title: string;
    userName: string;
    subscribers: number;
    works: number;
    srcImg: string;
}

const CommunityTopSection = ({
    title,
    userName,
    subscribers,
    works,
    srcImg,
    ...props
}: CommunityTopSectionPropsType) => {
	const { t } = useTranslation();

    const [isSubscribed, setIsSubscribed] = useState(false);
    const dispatch = useDispatch();

    return (
        <section className={classes.communityTop} {...props}>
            <img src={srcImg} alt={title} className={classes.img} />
            <div className={classes.communityTopInfo}>
                <h1 className={classes.communityTopTitle}>{title}</h1>
                <p className={classes.communityTopTag}>@{userName} <Copy className={classes.copyImg} onClick={e => communityTagClickHandler(e, dispatch, userName)} /></p>
                <div className={classes.communityTopStats}>
                    <div className={classes.statsItem}>
                        <Users className={`${classes.statsImg} ${classes.subscribersImg}`} />
                        <p className={classes.statsText}>
                            {parseNumber(subscribers)} {t("subscribersStr", {count: subscribers})}
                        </p>
                    </div>
                    <div className={classes.statsItem}>
                        <Image className={`${classes.statsImg} ${classes.subscribersImg}`} />
                        <p className={classes.statsText}>
                            {parseNumber(works)} {t("worksStr", {count: works})}
                        </p>
                    </div>
                </div>
            </div>
            <button
                onClick={e => subscribeHandler(e, isSubscribed, setIsSubscribed, userName, dispatch)}
                className={isSubscribed ? `${classes.subscribeButton} ${classes.unscribe}` : classes.subscribeButton}
            >
                {isSubscribed ? t("Unscribe") : t("Subscribe")}
            </button>
        </section>
    );
};

export { CommunityTopSection };
