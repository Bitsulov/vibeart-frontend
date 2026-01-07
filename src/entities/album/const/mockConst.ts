import { createAlbum } from "../model/createAlbum";
import post1 from "@/shared/icons/pivo.jpg";

export const profileAlbumsMock = [
    createAlbum({ id: 1, userId: 3, communityId: null }),
    createAlbum({
        id: 2,
        name: "Пейзажи",
        srcImg: post1,
        userId: 3,
		communityId: null,
        isFirst: false
    }),
    createAlbum({
        id: 3,
        name: "Фентези",
        srcImg: post1,
        userId: 3,
		communityId: null,
        isFirst: false
    }),
    createAlbum({
        id: 4,
        name: "Альбом 3",
        srcImg: post1,
        userId: 3,
		communityId: null,
        isFirst: false
    }),
    createAlbum({
        id: 5,
        name: "idhdlzhglfjlgjlsghlfdahkhesruhsiuerhgkrd",
        srcImg: post1,
        userId: 3,
		communityId: null,
        isFirst: false
    })
];

export const communityAlbumsMock = [
    createAlbum({ id: 1, userId: null, communityId: 1 }),
    createAlbum({
        id: 2,
        name: "Пейзажи",
        srcImg: post1,
        userId: null,
		communityId: 1,
        isFirst: false
    }),
    createAlbum({
        id: 3,
        name: "Фентези",
        srcImg: post1,
        userId: null,
		communityId: 1,
        isFirst: false
    }),
    createAlbum({
        id: 4,
        name: "Альбом 3",
        srcImg: post1,
        userId: null,
		communityId: 1,
        isFirst: false
    }),
    createAlbum({
        id: 5,
        name: "idhdlzhglfjlgjlsghlfdahkhesruhsiuerhgkrd",
        srcImg: post1,
        userId: null,
		communityId: 1,
        isFirst: false
    })
];

export const postAlbumMock = createAlbum({ id: 1, userId: 3, name: "Фентези", srcImg: post1, isFirst: false, communityId: null });
