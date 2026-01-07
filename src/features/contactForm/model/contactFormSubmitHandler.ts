import type React from "react";
import type { ErrorTextType } from "./types";
import { contactFormValidation } from "./contactFormValidation";

export function contactFormSubmitHandler(
    e: React.FormEvent,
    nameValue: string,
    emailValue: string,
    textValue: string,
    setNameErrorText: React.Dispatch<React.SetStateAction<ErrorTextType>>,
    setEmailErrorText: React.Dispatch<React.SetStateAction<ErrorTextType>>,
    setTextErrorText: React.Dispatch<React.SetStateAction<ErrorTextType>>,
    setIsNameError: React.Dispatch<React.SetStateAction<boolean>>,
    setIsEmailError: React.Dispatch<React.SetStateAction<boolean>>,
    setIsTextError: React.Dispatch<React.SetStateAction<boolean>>
) {
    e.preventDefault();
    if(!contactFormValidation(
        nameValue,
        emailValue,
        textValue,
        setNameErrorText,
        setEmailErrorText,
        setTextErrorText,
        setIsNameError,
        setIsEmailError,
        setIsTextError
    )) return false;
	
}
