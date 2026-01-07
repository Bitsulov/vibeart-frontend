import type React from "react";
import useValidationAuth from "./useValidationAuth";

const useSubmitSign = () => {
    const { validateAuthForm } = useValidationAuth();

    const submitSign = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateAuthForm()) return;
        console.log("Форма отправлена");
    };

    return { submitSign };
};

export default useSubmitSign;
