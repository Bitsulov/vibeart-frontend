import { describe, it, expect } from "vitest";
import { renderWithProviders } from "shared/tests/renderWithProviders";
import { CreatePostWidget } from "./createPostWidget";
import { screen } from "@testing-library/react";
import { galleryPostsMock } from "entities/post";

const defaultProps = {
    pagesDelta: 1,
    setPagesDelta: () => {},
    setPostInfo: () => {},
    setLoadedFile: () => {},
    postInfo: {},
    postTags: [],
    postName: "",
    postDescription: "",
    isCreateNewPost: true,
    communityId: null,
    UUID: "00000000-0000-4000-8000-00000000000b"
};

describe("CreatePostWidget - форма создания и редактирования публикации", () => {
    it("Отображает заголовок создания публикации в режиме создания", () => {
        renderWithProviders(
            <CreatePostWidget {...defaultProps} isCreateNewPost={true} />
        );

        expect(
            screen.getByRole("heading", { level: 1, name: "createPost.titleCreate" })
        ).toBeInTheDocument();
    });

    it("Отображает заголовок редактирования публикации в режиме редактирования", () => {
        renderWithProviders(
            <CreatePostWidget {...defaultProps} isCreateNewPost={false} />
        );

        expect(
            screen.getByRole("heading", { level: 1, name: "createPost.titleEdit" })
        ).toBeInTheDocument();
    });

    it("Предзаполняет название и описание данными редактируемой публикации", () => {
        const postInfo = { ...galleryPostsMock[0] };

        renderWithProviders(
            <CreatePostWidget
                {...defaultProps}
                isCreateNewPost={false}
                postInfo={postInfo}
                postTags={postInfo.tagsList.map(tag => tag.title)}
            />
        );

        expect(
            screen.getByRole("textbox", { name: "createPost.namePlaceholder" })
        ).toHaveValue(postInfo.name);
        expect(
            screen.getByRole("textbox", { name: "createPost.textPlaceholder" })
        ).toHaveValue(postInfo.description);
    });

    it("Отображает пустые поля названия и описания при создании новой публикации", () => {
        renderWithProviders(<CreatePostWidget {...defaultProps} />);

        expect(
            screen.getByRole("textbox", { name: "createPost.namePlaceholder" })
        ).toHaveValue("");
        expect(
            screen.getByRole("textbox", { name: "createPost.textPlaceholder" })
        ).toHaveValue("");
    });

    it("Отображает кнопку отправки формы", () => {
        renderWithProviders(<CreatePostWidget {...defaultProps} />);

        expect(
            screen.getByRole("button", { name: "ariaLabel.createPost" })
        ).toBeInTheDocument();
    });

    it("Показывает текст создания на кнопке в режиме создания", () => {
        renderWithProviders(
            <CreatePostWidget {...defaultProps} isCreateNewPost={true} />
        );

        expect(screen.getByText("createPost.submitTextMobile")).toBeInTheDocument();
    });

    it("Показывает текст изменения на кнопке в режиме редактирования", () => {
        renderWithProviders(
            <CreatePostWidget {...defaultProps} isCreateNewPost={false} />
        );

        expect(screen.getByText("createPost.submitTextEditMobile")).toBeInTheDocument();
    });
});
