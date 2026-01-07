import { AuthForm } from "features/authForm";
import { RegForm } from "features/regForm";
import type { ModalTypes } from "../model/types";

export const types: ModalTypes = {
    sign: AuthForm,
    reg: RegForm
};
