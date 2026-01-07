import { CommunityCountriesList } from "features/communityCountriesList";
import { ModalWindow } from "features/modalWindow";
import { TagList } from "features/tagList";
import { checkDateYear } from "shared/lib/dates";
import classes from "./communityModal.module.scss";
import type { TagType } from "entities/tag";
import type { countriesKeys } from "shared/lib/countriesKeys";
import { useTranslation } from "react-i18next";

interface CommunityModalPropsType {
    countriesList: (typeof countriesKeys)[number][] | "WholeWorld";
    tagsList: TagType[];
    date: string;
}

const CommunityModal = ({ countriesList, tagsList, date }: CommunityModalPropsType) => {
	const { t } = useTranslation();

    return (
        <ModalWindow>
            <h2 className={classes.aboutTitle}>{t("AboutCommunity")}</h2>
            <p className={classes.createdAt}>{t("CreatedWhen", {date: checkDateYear(date)})}</p>
            <h3 className={classes.aboutSubtitle}>{t("Countries")}:</h3>
            <CommunityCountriesList countriesList={countriesList} />
            <h3 className={classes.tagsTitle}>{t("Tags")}:</h3>
            <TagList tags={tagsList} />
        </ModalWindow>
    );
};

export { CommunityModal };
