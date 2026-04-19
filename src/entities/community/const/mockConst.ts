import {createCommunity} from "../model/createCommunity";
import {principalUserMock, profileUserMock} from "entities/user";
import img from "shared/icons/img-CTA.jpg";

export const communitiesMyMock = [
    createCommunity({
        id: 1,
        ULID: "01ARZ3NDEKTSV4RRFFQ69G5FB1",
        owner: principalUserMock,
        username: "digital-art-club",
        title: "Digital Art Club",
        description: "Community for digital artists sharing their works and techniques",
        posts: 42,
        subscribers: 1200,
        subscribes: 5,
        createdAt: "2026-01-10T10:00:00.000Z",
        imageUrl: img,
        albumsList: [],
        isSubscribed: true
    }),
    createCommunity({
        id: 2,
        ULID: "01ARZ3NDEKTSV4RRFFQ69G5FB2",
        owner: principalUserMock,
        username: "sketch-daily",
        title: "Sketch Daily",
        description: "Daily sketching challenges and inspiration for all skill levels",
        posts: 18,
        subscribers: 340,
        subscribes: 2,
        createdAt: "2026-02-15T12:00:00.000Z",
        imageUrl: img,
        albumsList: [],
        isSubscribed: true
    }),
];

export const communitiesAllMock = [
    createCommunity({
        id: 3,
        ULID: "01ARZ3NDEKTSV4RRFFQ69G5FB3",
        owner: profileUserMock,
        username: "photo-masters",
        title: "Photo Masters",
        description: "Professional and amateur photographers sharing tips and portfolios",
        posts: 310,
        subscribers: 8700,
        subscribes: 12,
        createdAt: "2025-11-20T09:00:00.000Z",
        imageUrl: img,
        albumsList: [],
        isSubscribed: false
    }),
    createCommunity({
        id: 4,
        ULID: "01ARZ3NDEKTSV4RRFFQ69G5FB4",
        owner: profileUserMock,
        username: "watercolor-world",
        title: "Watercolor World",
        description: "Dedicated to the art of watercolor painting — tutorials, showcases and critiques",
        posts: 95,
        subscribers: 2100,
        subscribes: 7,
        createdAt: "2026-03-01T08:30:00.000Z",
        imageUrl: img,
        albumsList: [],
        isSubscribed: false
    }),
    createCommunity({
        id: 5,
        ULID: "01ARZ3NDEKTSV4RRFFQ69G5FB6",
        owner: profileUserMock,
        username: "watercolor-world",
        title: "Watercolor World",
        description: "Dedicated to the art of watercolor painting — tutorials, showcases and critiques",
        posts: 95,
        subscribers: 2100,
        subscribes: 7,
        createdAt: "2026-03-01T08:30:00.000Z",
        imageUrl: img,
        albumsList: [],
        isSubscribed: false
    }),
    createCommunity({
        id: 6,
        ULID: "01ARZ3NDEKTSV4RRFFQ69G5FB5",
        owner: profileUserMock,
        username: "watercolor-world",
        title: "Watercolor World",
        description: "Dedicated to the art of watercolor painting — tutorials, showcases and critiques",
        posts: 91,
        subscribers: 2000,
        subscribes: 7,
        createdAt: "2026-03-01T08:30:00.000Z",
        imageUrl: img,
        albumsList: [],
        isSubscribed: false
    }),
];
