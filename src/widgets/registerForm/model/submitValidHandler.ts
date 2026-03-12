import type {IRegisterForm} from "../lib/types";
import type {UseFormSetValue} from "react-hook-form";

export function submitValidHandler(data: IRegisterForm, setValue: UseFormSetValue<IRegisterForm>) {
    console.log("Valid form submit ", data);
    setValue("email", "");
    setValue("password", "");
    setValue("confirmPassword", "");
    setValue("agreed", false);
}
