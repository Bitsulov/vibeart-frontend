import type {IAuthForm} from "../lib/types";
import type {FieldErrors} from "react-hook-form";

export function submitInvalidHandler(data: FieldErrors<IAuthForm>) {
    console.log("Invalid form submit ", data);
}
