import { useState } from "react";
import { Layout } from "widgets/layout";
import classes from "./community.module.scss";
import { useLoadPageStatus } from "entities/pageStats";
import { communitieMock } from "entities/community";
import { userCommunityMock } from "entities/user";
import { communityWithAdminsMock } from "entities/communityWithAdmins";
import { communityPostsMock } from "entities/post";
import { communityAlbumsWithPostsMock } from "entities/albumsWithPosts";
import { CommunityTopSection } from "widgets/communityTopSection";
import { CommunityBottomSection } from "widgets/communityBottomSection";
import { communityAlbumsMock } from "entities/album";
import { communityTagsMocks } from "entities/tag";
import { CommunityModal } from "widgets/communityModal";

export const Community = () => {
    const isPageLoaded = useLoadPageStatus();

    const [selectedAlbum, setSelectedAlbum] = useState(1);
    const admins = userCommunityMock.filter(user => communityWithAdminsMock.find(i => i.AdminId === user.id));
    const currentPostList = communityPostsMock.filter(post =>
        communityAlbumsWithPostsMock.find(i => selectedAlbum === i.albumId && i.postId === post.id)
    );

    return (
        <Layout pageStatus={isPageLoaded}>
            <main className={classes.community}>
                <CommunityModal
                    countriesList={communitieMock.countries}
                    date={communitieMock.date}
                    tagsList={communityTagsMocks}
                />
                <CommunityTopSection
                    title={communitieMock.title}
                    srcImg={communitieMock.srcImg}
                    userName={communitieMock.userName}
                    subscribers={communitieMock.subscribers}
                    works={communitieMock.works}
                />
                <CommunityBottomSection
                    description={communitieMock.description}
                    selectedAlbum={selectedAlbum}
                    setSelectedAlbum={setSelectedAlbum}
                    albums={communityAlbumsMock}
                    postList={currentPostList}
                    admins={admins}
                    tags={communityTagsMocks}
                    date={communitieMock.date}
                    countries={communitieMock.countries}
                />
            </main>
        </Layout>
    );
};
