import React from "react";

type InputType = "text" | "email" | "password";

export function toggleTypeHandler(type: InputType, setCurrentType: React.Dispatch<React.SetStateAction<InputType>>) {
    if (type === "text") {
        setCurrentType("password");
    } else {
        setCurrentType("text");
    }
}
