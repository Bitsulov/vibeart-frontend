import {createAlbum} from "../model/createAlbum";
import {profileAlbum1PostsMock, profileAlbum2PostsMock} from "entities/post";
import img from "shared/icons/img-CTA.jpg";

export const profileAlbumsMock = [
    createAlbum({
        id: 1,
        ULID: "01ARZ3NDEKTSV4RRFFQ69G5FAV",
        name: "test album",
        description: "Description of album 1 Description of album 1 Description of album 1 Description of album 1 Description of album 1",
        postCount: 4,
        postsList: profileAlbum1PostsMock,
        imageUrl: img,
        createdAt: "2026-03-24T18:48:16.175Z"
    }),
    createAlbum({
        id: 2,
        ULID: "01ARZ3NDEKTSV4RRFFQ69G5FAK",
        name: "test album 2",
        description: "Description of album 2 Description of album 2 Description of album 2 Description of album 2 Description of album 2",
        postCount: 1,
        postsList: profileAlbum2PostsMock,
        imageUrl: img,
        createdAt: "2026-03-23T18:48:16.175Z"
    }),
    createAlbum({
        id: 3,
        ULID: "01ARZ3NDEKTSV4RRFFQ69G5FAA",
        name: "test album 3",
        description: "Description of album 3 Description of album 2 Description of album 2 Description of album 2 Description of album 2",
        postCount: 0,
        postsList: [],
        imageUrl: img,
        createdAt: "2026-03-23T18:48:16.175Z"
    }),
    createAlbum({
        id: 4,
        ULID: "01ARZ3NDEKTSV4RRFFQ69G5FAC",
        name: "test album 4",
        description: "Description of album 4 Description of album 2 Description of album 2 Description of album 2 Description of album 2",
        postCount: 0,
        postsList: [],
        imageUrl: img,
        createdAt: "2026-03-23T18:48:16.175Z"
    })
];
