import type { PostType } from "entities/post";
import classes from "./profilePostList.module.scss";
import { ProfilePostItem } from "features/profilePostItem";
import { useTranslation } from "react-i18next";

interface ProfilePostListPropsType {
    posts: PostType[];
}

const ProfilePostList = ({ posts, ...props }: ProfilePostListPropsType) => {
	const { t } = useTranslation();

    return posts.length ? (
        <div className={classes.posts__list} {...props}>
            {posts.map(item => (
                <ProfilePostItem
                    id={item.id}
                    srcImg={item.srcImg}
                    title={item.title}
                    description={item.description}
                    likes={item.likes}
                    comments={item.comments}
                    reposts={item.reposts}
                    date={item.date}
                    tags={item.tags}
                    key={item.id}
                />
            ))}
        </div>
    ) : (
        <div className={classes.titleWrapper}>
            <h2 className={classes.posts__title}>{t("profilePostListEmptyTitle")}</h2>
        </div>
    );
};

export { ProfilePostList };
