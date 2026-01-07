import type React from "react";
import { useDispatch } from "react-redux";
import { TagList } from "features/tagList";
import classes from "./communityBottomSection.module.scss";
import { AlbumList } from "widgets/albumList";
import { ProfilePostList } from "widgets/profilePostList";
import type { AlbumType } from "entities/album";
import type { PostType } from "entities/post";
import type { UserType } from "entities/user";
import type { TagType } from "entities/tag";
import type { countriesKeys } from "shared/lib/countriesKeys";
import { CommunityAdminsList } from "features/communityAdminsList";
import { CommunityCountriesList } from "features/communityCountriesList";
import { checkDateYear } from "shared/lib/dates";
import { openMoreInfoHandler } from "../model/openMoreInfoHandler";
import { useTranslation } from "react-i18next";

interface CommunityBottomSectionPropsType {
    description: string;
    selectedAlbum: number;
    setSelectedAlbum: React.Dispatch<React.SetStateAction<number>>;
    albums: AlbumType[];
    postList: PostType[];
    admins: UserType[];
    tags: TagType[];
    date: string;
    countries: (typeof countriesKeys)[number][] | "WholeWorld";
}

const CommunityBottomSection = ({
    description,
    admins,
    albums,
    postList,
    countries,
    tags,
    selectedAlbum,
    setSelectedAlbum,
    date,
    ...props
}: CommunityBottomSectionPropsType) => {
	const { t } = useTranslation();

    const dispatch = useDispatch();

    return (
        <section className={classes.communityBottom} {...props}>
            <div className={classes.communityMain}>
                <div className={classes.descriptionWrapper}>
                    <h3 className={classes.descriptionTitle}>{t("Description")}</h3>
                    <p className={classes.descriptionText}>{description}</p>
                    <button onClick={e => openMoreInfoHandler(e, dispatch)} className={classes.moreButton}>
                        {t("MoreInfo")}
                    </button>
                </div>
                <div className={classes.adminsWrapper}>
                    <h3 className={classes.adminsTitle}>{t("Admins")}</h3>
                    <CommunityAdminsList adminsList={admins} />
                </div>
                <AlbumList albumList={albums} selectedAlbum={selectedAlbum} setSelectedAlbum={setSelectedAlbum} />
                <ProfilePostList posts={postList} />
            </div>
            <div className={classes.communityAbout}>
                <h2 className={classes.aboutTitle}>{t("AboutCommunity")}</h2>
                <p className={classes.createdAt}>{t("CreatedWhen", { date: checkDateYear(date) })}</p>
                <h3 className={classes.aboutSubtitle}>{t("Countries")}:</h3>
                <CommunityCountriesList countriesList={countries} />
                <h3 className={classes.tagsTitle}>{t("Tags")}:</h3>
                <TagList tags={tags} />
            </div>
        </section>
    );
};

export { CommunityBottomSection };
