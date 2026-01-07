import type { countriesKeys } from "shared/lib/countriesKeys";

export interface CommunityType {
    id: number;
    title: string;
    userName: string;
    description: string;
    subscribers: number;
    works: number;
    srcImg: string;
    creatorId: number;
    date: string;
    countries: (typeof countriesKeys)[number][] | "WholeWorld";
}
