import type {IRegisterForm} from "../lib/types";
import type {FieldErrors} from "react-hook-form";

/** Обрабатывает неуспешную отправку формы регистрации. */
export function submitInvalidHandler(data: FieldErrors<IRegisterForm>) {
    console.log("Invalid form submit ", data);
}
