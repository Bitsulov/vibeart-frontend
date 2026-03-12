import React from "react";

type InputType = "text" | "email" | "password";

export function toggleTypeHandler(type: InputType, setCurrentType: React.Dispatch<React.SetStateAction<InputType>>) {
    type === "text" ? setCurrentType("password") : setCurrentType("text");
}
