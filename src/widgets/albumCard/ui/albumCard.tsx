import c from "./albumCard.module.scss";
import {BackLink} from "features/backLink";
import {DeleteButton} from "features/deleteButton";
import {EditButton} from "features/editButton";
import {useTranslation} from "react-i18next";
import {showHint} from "../model/showHint";
import {hideHint} from "../model/hideHint";
import {useDispatch, useSelector} from "react-redux";
import {deleteButtonClickHandler} from "../model/deleteButtonClickHandler";
import {ConfirmModal} from "widgets/confirmModal";
import {confirmDeletePost} from "../model/confirmDeletePost";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {StatItem} from "features/statItem";
import {ChevronDown, Image} from "lucide-react";
import {getShortNumber} from "shared/lib/getShortNumber";
import clsx from "clsx";
import {useWindowWidth} from "shared/hooks/useWindowWidth";
import type {PostType} from "entities/post";
import {openDescriptionHandler} from "../model/openDescriptionHandler";
import {PostList} from "widgets/postList";
import {getLocalTimeNumbers} from "shared/lib/getLocalTimeNumbers";
import {selectCurrentLanguage} from "entities/appConfig";

interface AlbumCardProps {
    isOwner: boolean;
    ULID: string;
    authorULID: string;
    title: string;
    description: string;
    imageUrl: string;
    worksCount: number;
    date: string;
    postList: PostType[];
}

export const AlbumCard = ({
    title,
    description,
    ULID,
    authorULID,
    imageUrl,
    worksCount,
    postList,
    date,
    isOwner = false,
    ...props
}: AlbumCardProps) => {
    const { t } = useTranslation();

    const currentLanguage = useSelector(selectCurrentLanguage);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const windowWidth = useWindowWidth();

    const isDesktop = windowWidth >= 1200

    const [isShowConfirm, setIsShowConfirm] = useState(false);
    const [isDescriptionOpened, setIsDescriptionOpened] = useState(false);

    const pages = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const [pagesDelta, setPagesDelta] = useState(2);

	return (
		<section className={c.album} {...props}>
            <div className="container">
                <ConfirmModal
                    confirmFn={() => confirmDeletePost(navigate, authorULID)}
                    ariaLabelConfirm={t("ariaLabel.deleteAlbumModal", {name: title})}
                    text={t("modal.deleteAlbum")}
                    isShowModal={isShowConfirm}
                    setIsShowModal={setIsShowConfirm}
                />
                <div className={c.controls}>
                    <BackLink className={c.back} />
                    {isOwner && (
                        <div className={c.actions}>
                            <DeleteButton
                                ariaLabel={t("ariaLabel.deleteAlbum")}
                                onMouseEnter={() => showHint(dispatch, t("hint.deleteAlbum"))}
                                onMouseLeave={() => hideHint(dispatch)}
                                onClick={() => deleteButtonClickHandler(setIsShowConfirm)}
                                className={c.delete}
                            />
                            <EditButton
                                ULID={ULID}
                                type="album"
                                ariaLabel={t("ariaLabel.editAlbum")}
                                onMouseEnter={() => showHint(dispatch, t("hint.editAlbum"))}
                                onMouseLeave={() => hideHint(dispatch)}
                                className={c.edit}
                            />
                        </div>
                    )}
                </div>
                <div className={c.card_container}>
                    <article className={c.album_card}>
                        <img
                            decoding="async"
                            width="268"
                            height="261"
                            src={imageUrl}
                            alt={title}
                            className={c.img}
                        />
                        <div className={c.info}>
                            {!isDesktop &&
                                <StatItem
                                    onMouseEnter={() => showHint(dispatch, t("hint.works"))}
                                    onMouseLeave={() => hideHint(dispatch)}
                                    className={c.works}
                                    iconClassName={c.icon}
                                    Icon={Image}
                                    number={getShortNumber(worksCount)}
                                />
                            }
                            <h1 className={c.title}>{title}</h1>
                            <div className={c.description_wrapper}>
                                <p className={clsx(c.description, !isDescriptionOpened && !isDesktop && c.description_collapsed)}>
                                    {description}
                                </p>
                                {!isDescriptionOpened && !isDesktop && (
                                    <button
                                        className={c.expand_btn}
                                        onClick={() => openDescriptionHandler(setIsDescriptionOpened)}
                                        aria-label={t("ariaLabel.openDescription")}
                                    >
                                        <ChevronDown width="24" height="24" />
                                    </button>
                                )}
                            </div>
                            <div className={c.bottom}>
                                {isDesktop &&
                                    <StatItem
                                        onMouseEnter={() => showHint(dispatch, t("hint.works"))}
                                        onMouseLeave={() => hideHint(dispatch)}
                                        className={c.desktop_stat}
                                        iconClassName={c.icon}
                                        Icon={Image}
                                        number={getShortNumber(worksCount)}
                                    />
                                }
                                <p className={c.date}>{getLocalTimeNumbers(currentLanguage, date)}</p>
                            </div>
                        </div>
                    </article>
                    <PostList
                        postList={postList}
                        title={title}
                        pagesCount={pages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        pagesDelta={pagesDelta}
                        setPagesDelta={setPagesDelta}
                        className={c.posts}
                        isShowAddButton={true}
                        flexible={true}
                        isUniqueTitle={false}
                    />
                </div>
            </div>
		</section>
	)
}
