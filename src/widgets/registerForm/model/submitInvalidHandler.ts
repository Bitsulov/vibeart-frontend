import type {IRegisterForm} from "../lib/types";
import type {FieldErrors} from "react-hook-form";

export function submitInvalidHandler(data: FieldErrors<IRegisterForm>) {
    console.log("Invalid form submit ", data);
}
