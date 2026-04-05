import {Layout} from "widgets/layout";
import {PostCard} from "widgets/postCard";
import {principalUserMock, selectUserInfo} from "entities/user";
import {postMock} from "entities/post";
import {albumMock} from "entities/album";
import {useSelector} from "react-redux";
import {PostComments} from "widgets/postComments";
import {commentsMock} from "entities/comment";
import {useTranslation} from "react-i18next";

export const Post = () => {
    const userInfo = useSelector(selectUserInfo);
    const { t } = useTranslation();

    return (
        <Layout>
            <title>{t("titles.post")}</title>
            <meta name="description" content={t("description.post")} />
            <PostCard
                authorAvatarUrl={principalUserMock.avatarUrl}
                authorName={principalUserMock.name}
                authorULID={principalUserMock.ULID}
                imageUrl={postMock.imageUrl}
                title={postMock.name}
                description={postMock.description}
                tagsList={postMock.tagsList}
                likesCount={postMock.likes}
                reportsCount={postMock.reports}
                createdAt={postMock.createdAt}
                albumName={albumMock.name}
                albumULID={albumMock.ULID}
                ULID={postMock.ULID}
                isOwner={principalUserMock.id === userInfo.id}
            />
            <PostComments userInfo={userInfo} commentsCount={commentsMock.length} commentsList={commentsMock} />
        </Layout>
    );
};
