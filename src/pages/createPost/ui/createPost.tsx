import c from "./createPost.module.scss";
import {Layout} from "widgets/layout";
import {BackLink} from "features/backLink";
import {useState} from "react";
import type {PostType} from "entities/post";
import {CreatePostWidget} from "widgets/createPostWidget";
import {Post} from "features/post";
import {useSelector} from "react-redux";
import {selectUser} from "entities/user";
import {onSubmitForm} from "../model/onSubmitForm";
import clsx from "clsx";
import {useTranslation} from "react-i18next";

/** Страница создания поста. */
export const CreatePost = () => {
    const { t } = useTranslation();
    const [postInfo, setPostInfo] = useState<Partial<PostType>>({});

    const principalUser = useSelector(selectUser);

    const pagesTags = 15;
    const [currentPageTags, setCurrentPageTags] = useState<number>(1);
    const [pagesDelta, setPagesDelta] = useState<number>(2);

    const [loadedFile, setLoadedFile] = useState<File>();
    const [isErrorImg, setIsErrorImg] = useState<boolean>(false);

	return (
		<Layout>
            <title>{t("titles.postCreate")}</title>
            <meta name="description" content={t("description.postCreate")} />
            <section className={c.content}>
                <div className="container">
                    <div className={c.content_inner}>
                        <BackLink className={c.back} />
                        <Post
                            className={clsx(c.post, isErrorImg && c.error)}
                            date={new Date().toISOString()}
                            author={principalUser}
                            title={postInfo?.name ?? ""}
                            imageUrl={postInfo?.imageUrl ?? ""}
                            ULID={postInfo?.ULID ?? ""}
                            type="button"
                            enable={false}
                        />
                        <CreatePostWidget
                            className={c.form}
                            setPostInfo={setPostInfo}
                            pages={pagesTags}
                            pagesDelta={pagesDelta}
                            setPagesDelta={setPagesDelta}
                            currentPage={currentPageTags}
                            setCurrentPage={setCurrentPageTags}
                            loadedFile={loadedFile}
                            setLoadedFile={setLoadedFile}
                            onSubmit={() => onSubmitForm(loadedFile, setIsErrorImg)}
                        />
                    </div>
                </div>
            </section>
		</Layout>
	)
}
