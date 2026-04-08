import c from "./albumModal.module.scss";
import clsx from "clsx";
import {StylizedButton} from "features/stylizedButton";
import React, {useState} from "react";
import {defaultTransitionTime} from "shared/const/const";
import {useTranslation} from "react-i18next";
import {closeButtonClickHandler} from "../model/closeButtonClickHandler";
import {modalClickHandler} from "../model/modalClickButton";
import type {PostType} from "entities/post";
import {SearchInput} from "features/searchInput";
import {PostListModal} from "../../postListModal";
import {searchHandler} from "../model/searchHandler";
import {TransparentButton} from "features/transparentButton";
import {addAlbumsClickHandler} from "../model/addAlbumsClickHandler";

interface AlbumModalProps {
    isShowModal: boolean;
    setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    postList: PostType[]
}

export const AlbumModal = ({
    isShowModal,
    setIsShowModal,
    postList,
    ...props
}: AlbumModalProps) => {
    const { t } = useTranslation();

    const [isDisappearring, setIsDisappearring] = useState(false);
    const transitionTime = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--transition-time"))
        || defaultTransitionTime;

    const pages = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesDelta, setPagesDelta] = useState(2);

    const [selectedPosts, setSelectedPosts] = useState<string[]>([]);

    const [searchValue, setSearchValue] = useState<string>("");

	return (
        <>
            {isShowModal && (
                <div
                    onClick={() => closeButtonClickHandler(setIsDisappearring, transitionTime, setIsShowModal, setSelectedPosts)}
                    className={clsx(c.background, isDisappearring && c.close)}
                >
                    <div className="container">
                        <dialog open onClick={e => modalClickHandler(e)} aria-modal="true" className={c.modal} {...props}>
                            <div className={c.top}>
                                <h3 className={c.title}>{t("album.addPost")}</h3>
                            </div>
                            <div className={c.content}>
                                <div className={c.container}>
                                    <SearchInput
                                        value={searchValue}
                                        onChange={(e) => searchHandler(e, setSearchValue)}
                                        className={c.search}
                                    />
                                    <PostListModal
                                        postList={postList}
                                        pagesCount={pages}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pagesDelta={pagesDelta}
                                        setPagesDelta={setPagesDelta}
                                        selectedPosts={selectedPosts}
                                        setSelectedPosts={setSelectedPosts}
                                    />
                                </div>
                            </div>
                            <div className={c.bottom}>
                                <div className={c.buttons}>
                                    <TransparentButton
                                        className={c.button}
                                        ariaLabel={t("ariaLabel.closeModal")}
                                        onClick={() => closeButtonClickHandler(setIsDisappearring, transitionTime, setIsShowModal, setSelectedPosts)}
                                    >
                                        {t("Close")}
                                    </TransparentButton>
                                    <StylizedButton
                                        className={c.button}
                                        ariaLabel={t("ariaLabel.addPostsInAlbum")}
                                        onClick={() => addAlbumsClickHandler(setIsDisappearring, transitionTime, setIsShowModal, setSelectedPosts)}
                                    >
                                        {t("Add")}
                                    </StylizedButton>
                                </div>
                            </div>
                        </dialog>
                    </div>
                </div>
            )}
        </>
	)
}
