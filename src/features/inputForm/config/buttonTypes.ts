import HideButton from "../ui/hideButton";
import ShowButton from "../ui/showButton";
import type { HideButtonType } from "../ui/hideButton";
import type { ShowButtonType } from "../ui/showButton";
import type { FC } from "react";

interface buttonTypesType {
    text: FC<HideButtonType>;
    email: FC<HideButtonType>;
    password: FC<ShowButtonType>;
}

const buttonTypes: buttonTypesType = {
    text: HideButton,
    email: HideButton,
    password: ShowButton
};

export { buttonTypes };
