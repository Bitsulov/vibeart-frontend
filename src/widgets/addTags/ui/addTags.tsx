import c from "./addTags.module.scss";
import { useTranslation } from "react-i18next";
import { SearchInput } from "features/searchInput";
import {
    type ComponentPropsWithoutRef,
    type Dispatch,
    type SetStateAction,
    useEffect,
    useState
} from "react";
import { createTag, getTags, getTagsBySearch } from "entities/tag";
import { PostTag } from "features/postTag";
import { PagesButtons } from "features/pagesButtons";
import { chooseTagClickHandler } from "../model/chooseTagClickHandler";
import clsx from "clsx";
import { useWindowWidth } from "shared/hooks/useWindowWidth";
import { useDebouncedValue } from "shared/hooks/useDebouncedValue";
import { useQuery } from "@tanstack/react-query";

/** Свойства компонента {@link AddTags}. */
interface AddTagsProps extends ComponentPropsWithoutRef<"div"> {
    /** Количество кнопок страниц, отображаемых по обе стороны от текущей в {@link PagesButtons}. */
    pagesDelta: number;
    /** Функция обновления `pagesDelta`. Значение пересчитывается внутри компонента при изменении ширины экрана. */
    setPagesDelta: Dispatch<SetStateAction<number>>;
    /** Массив названий выбранных тегов. */
    chosenTags: string[];
    /** Функция обновления массива выбранных тегов. */
    setChosenTags: Dispatch<SetStateAction<string[]>>;
}

/**
 * Виджет выбора тегов для публикации: поле поиска, список кнопок-тегов и постраничная навигация.
 *
 * Загружает теги с сервера: без запроса в поле поиска — постраничный
 * список всех тегов, с запросом — результаты поиска по подстроке.
 * При изменении запроса возвращается на первую страницу.
 * Адаптирует значение `pagesDelta` в зависимости от ширины экрана, чтобы количество
 * кнопок страниц не переполняло панель. Выбранные теги подсвечиваются CSS-классом `c.select`.
 */
export const AddTags = ({
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

    const [search, setSearch] = useState("");
    const debouncedSearch = useDebouncedValue(search.trim(), 400);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch]);

    const tagsQuery = useQuery({
        queryKey: [`tags ${debouncedSearch}`, currentPage],
        queryFn: () =>
            debouncedSearch
                ? getTagsBySearch(debouncedSearch, { page: currentPage - 1, size: 10 })
                : getTags({ page: currentPage - 1, size: 10 })
    });

    const tagsList = (tagsQuery.data?.data.content ?? []).map(tag => createTag(tag));
    const pages = tagsQuery.data?.data.totalPages || 1;

    const selectedTagsList = chosenTags
        .filter(title => !tagsList.some(tag => tag.title === title))
        .map(title => createTag({ title, createdAt: "" }));

    const displayedTagsList = [...selectedTagsList, ...tagsList];

    return (
        <div className={c.tags} {...props}>
            <h2 className={c.title}>{t("createPost.tagsTitle")}</h2>
            <SearchInput
                className={c.search}
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <div className={c.tags_list}>
                {displayedTagsList.map((tag, i) => (
                    <PostTag
                        type="button"
                        className={clsx(chosenTags.includes(tag.title) && c.select)}
                        onClick={() =>
                            chooseTagClickHandler(tag.title, chosenTags, setChosenTags)
                        }
                        aria-label={t("chooseTag", { name: tag.title })}
                        key={`tag ${i}`}
                        tag={tag}
                    />
                ))}
            </div>
            <PagesButtons
                pagesCount={pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                pagesDelta={pagesDelta}
            />
        </div>
    );
};
