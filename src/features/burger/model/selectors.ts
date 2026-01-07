import type { RootState } from "app/store";

export const selectBURGEROPENLINKSHEIGHT = (state: RootState) => state.burger.BURGEROPENLINKSHEIGHT;
export const selectBurgerLinksHeight = (state: RootState) => state.burger.burgerLinksHeight;
export const selectIsBurgerOpen = (state: RootState) => state.burger.isBurgerOpen;
