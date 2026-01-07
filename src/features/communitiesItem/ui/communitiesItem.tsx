import { parseNumber } from "shared/lib/parseNumber";
import classes from "./communitiesItem.module.scss";
import { Link } from "react-router-dom";
import { formatSubscribersRu } from "shared/lib/formatSubscribersRu";
import { useTranslation } from "react-i18next";

interface CommunitiesItemPropsType {
	id: number;
	srcImg: string;
	title: string;
	description: string;
	subscribers: number
}

const CommunitiesItem = ({id, srcImg, title, description, subscribers}: CommunitiesItemPropsType) => {
	const { t } = useTranslation();

	return (
		<div className={classes.item}>
			<img className={classes.itemImg} src={srcImg} alt={title} />
			<div className={classes.itemInfo}>
				<h3 className={classes.itemTitle}>{title}</h3>
				<p className={classes.itemDescription}>
					{description}
				</p>
				<div className={classes.itemBottom}>
					<p className={classes.itemMembers}>{parseNumber(subscribers)} {t("subscribersStr", {count: subscribers})}</p>
					<Link className={classes.itemLink} to={`/communities/${id}`}>{t("GoTo")}</Link>
				</div>
			</div>
		</div>
	)
}

export { CommunitiesItem };
