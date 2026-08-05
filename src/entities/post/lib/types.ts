import type { TagType } from "entities/tag";
import type { CommentType } from "entities/comment";
import type { UserResponse, UserType } from "entities/user";
import type { CommunityResponse, CommunityType } from "entities/community";

/**
 * Описывает публикацию — основную единицу контента на сайте.
 *
 * Публикация содержит изображение творческой работы вместе со всеми
 * связанными метаданными и состоянием модерации, возвращаемыми сервером.
 */
export interface PostType {
    /** UUID, используемый в публичных URL (например, `/post/:uuid`). */
    UUID: string;
    /** Заголовок публикации, заданный автором. */
    name: string;
    /** Развёрнутое описание, сопровождающее изображение. */
    description: string;
    /** Автор публикации: пользователь либо сообщество. */
    author: UserType | CommunityType;
    /** Общее количество полученных отметок «нравится». */
    likes: number;
    /** Общее количество комментариев к публикации. */
    comments: number;
    /** Общее количество жалоб, поданных пользователями. */
    reports: number;
    /** Теги, прикреплённые к публикации для поиска и фильтрации. */
    tagsList: TagType[];
    /** Список комментариев, загруженных для данной публикации. */
    commentList: CommentType[];
    /**
     * Статус проверки модератором:
     * `"checked"` — проверено, `"unchecked"` — ожидает проверки.
     */
    checkStatus: "checked" | "unchecked";
    /**
     * Результат анализа содержимого системой искусственного интеллекта:
     * `"good"` — прошло проверку, `"problem"` — выявлены нарушения.
     */
    AIStatus: "problem" | "good";
    /** URL изображения творческой работы. */
    imageUrl: string;
    /** Дата и время публикации в формате ISO 8601. */
    createdAt: string;
    /** Признак того, что текущий пользователь поставил лайк публикации. */
    isLiked: boolean;
    /** Признак того, что текущий пользователь пожаловался на публикацию. */
    isReported: boolean;
}

/** Публикация, возвращаемая сервером. */
export interface PostResponse {
    uuid: string;
    title: string;
    description: string;
    likesCount: number;
    commentsCount: number;
    reportsCount: number;
    aiStatus: "problem" | "good";
    imageUrl: string;
    createdAt: string;
    author: UserResponse | null;
    community: CommunityResponse | null;
    tags: string[];
    liked: boolean;
    reported: boolean;
}

/** Текстовая информация и файл изображения для создания публикации. */
export interface CreatePostRequest {
    info: {
        title: string;
        description: string;
        authorUuid: string;
        tagsTitles: string[];
    };
    file: File;
}

/** Текстовая информация и, при замене, новый файл изображения для обновления публикации. */
export interface UpdatePostRequest {
    info: {
        title: string;
        description: string;
        tagsTitles: string[];
    };
    file?: File;
}
