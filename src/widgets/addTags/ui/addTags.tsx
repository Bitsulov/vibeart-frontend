import c from "./addTags.module.scss";
import {useTranslation} from "react-i18next";
import {SearchInput} from "features/searchInput";
import {type ComponentPropsWithoutRef, type Dispatch, type SetStateAction, useEffect} from "react";
import type {TagType} from "entities/tag";
import {PostTag} from "features/postTag";
import {PagesButtons} from "features/pagesButtons";
import {chooseTagClickHandler} from "../model/chooseTagClickHandler";
import clsx from "clsx";
import {useWindowWidth} from "shared/hooks/useWindowWidth";

interface AddTagsProps extends ComponentPropsWithoutRef<"div"> {
    tagsList: TagType[];
    pages: number;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    pagesDelta: number;
    setPagesDelta: Dispatch<SetStateAction<number>>;
    chosenTags: string[];
    setChosenTags: Dispatch<SetStateAction<string[]>>;
}

/**
 * Виджет выбора тегов для поста: поиск, список кнопок-тегов и пагинация.
 *
 * @param tagsList - Полный список доступных тегов.
 * @param pages - Общее количество страниц тегов.
 * @param currentPage - Текущая страница.
 * @param setCurrentPage - Сеттер текущей страницы.
 * @param pagesDelta - Количество кнопок страниц по обе стороны от текущей.
 * @param setPagesDelta - Сеттер pagesDelta, управляется отсюда по ширине экрана.
 * @param chosenTags - Массив выбранных тегов.
 * @param setChosenTags - Сеттер выбранных тегов.
 */
export const AddTags = ({
    tagsList,
    pages,
    currentPage,
    setCurrentPage,
    pagesDelta,
    setPagesDelta,
    chosenTags,
    setChosenTags,
    ...props
}: AddTagsProps) => {
    const { t } = useTranslation();

    const windowWidth = useWindowWidth();

    useEffect(() => {
        if (windowWidth >= 1500) {
            setPagesDelta(3);
        } else if (windowWidth >= 1350) {
            setPagesDelta(4);
        } else if (windowWidth >= 1200) {
            setPagesDelta(3);
        } else {
            setPagesDelta(2);
        }
    }, [windowWidth, setPagesDelta]);

	return (
		<div className={c.tags} {...props}>
			<h2 className={c.title}>{t("createPost.tagsTitle")}</h2>
            <SearchInput className={c.search} />
            <div className={c.tags_list}>
                {tagsList.map((tag, i) =>
                    <PostTag
                        type="button"
                        className={clsx(chosenTags.includes(tag.title) && c.select)}
                        onClick={() => chooseTagClickHandler(tag.title, chosenTags, setChosenTags)}
                        aria-label={t("chooseTag", {name: tag.title})}
                        key={`tag ${i}`}
                        tag={tag}
                    />
                )}
            </div>
            <PagesButtons
                pagesCount={pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pagesDelta={pagesDelta}
            />
		</div>
	)
}
