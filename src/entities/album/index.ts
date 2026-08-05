export { createAlbum } from "./model/createAlbum";
export type {
    AlbumType,
    AlbumResponse,
    AlbumCreateRequest,
    AlbumUpdateRequest
} from "./lib/types";
export { profileAlbumsMock, albumMock, albumResponseMock } from "./const/mockConst";
export {
    getAlbumsByAuthor,
    getAlbum,
    addAlbum,
    updateAlbum,
    addPostsToAlbum,
    deleteAlbum
} from "./api/albumApi";
