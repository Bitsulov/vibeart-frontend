import React, { useEffect, useState } from "react";
import classes from "./inputForm.module.scss";
import { buttonTypes } from "../config/buttonTypes";
import { onChangeValue } from "../model/onChangeValue";
import { toggleButtonHandler } from "../model/toggleButtonHandler";

interface InputFormType {
    placeholder: string;
    type: "text" | "password" | "email";
    id: string;
    value: string;
    className?: string;
    placeholderClassName?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    minLength?: number;
    defaultValue?: string | null;
}

type buttonType = "text" | "password" | "email";

const InputForm = ({
    placeholder = "",
    type = "text",
    id = "",
    value,
    className = "",
    placeholderClassName = "",
    onChange,
    minLength,
    defaultValue = null,
    ...props
}: InputFormType) => {
    const [inputClasses, setInputClasses] = useState<string>([classes.input, className].join(" "));
    const [placeholderClasses, setPlaceholderClasses] = useState<string>(
        [classes.placeholder, placeholderClassName].join(" ")
    );
    const [isPassword, setIsPassword] = useState(false);
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [currentType, setCurrentType] = useState<buttonType | null>(null);
    const [defaultClass, setDefaultClass] = useState(null);

    useEffect(() => {
        if (currentType) {
            if (isShowPassword) {
                setCurrentType("text");
            } else {
                setCurrentType("password");
            }
        } else {
            setCurrentType(type);
            if (type === "password") {
                setIsPassword(true);
                setDefaultClass(classes.inputLeft);
                setInputClasses([classes.inputLeft, className].join(" "));
            } else {
                setDefaultClass(classes.input);
                setInputClasses([classes.input, className].join(" "));
            }
        }
    }, [type, isShowPassword]);

    useEffect(() => {
        if (value || defaultValue) {
            setInputClasses([defaultClass, className, classes.focus].join(" "));
            setPlaceholderClasses([classes.placeholder, placeholderClassName, classes.focus].join(" "));
        } else {
            setInputClasses([defaultClass, className].join(" "));
            setPlaceholderClasses([classes.placeholder, placeholderClassName].join(" "));
        }
    }, [value, defaultValue, className, placeholderClassName, defaultClass]);

    useEffect(() => {
        if (value || defaultValue) {
            setInputClasses([defaultClass, className, classes.focus].join(" "));
            setPlaceholderClasses([classes.placeholder, placeholderClassName, classes.focus].join(" "));
        }
    }, []);

    const createButton = (currentType: buttonType | null, onClick: (e: React.MouseEvent) => void) => {
        if (currentType !== null) {
            const Button = buttonTypes[currentType];
            return <Button onClick={onClick} />;
        }
    };

    return (
        <div className={classes.generalWrapper}>
            <div className={classes.inputWrapper}>
                <input
                    type={currentType ?? "text"}
                    id={id}
                    className={inputClasses}
                    value={value}
                    minLength={minLength}
                    onChange={e =>
                        onChangeValue(
                            e,
                            classes,
                            defaultClass,
                            className,
                            placeholderClassName,
                            setInputClasses,
                            setPlaceholderClasses,
							onChange,
                        )
                    }
                    {...props}
                ></input>
                {isPassword && createButton(currentType, e => toggleButtonHandler(e, setIsShowPassword))}
                <label className={placeholderClasses} htmlFor={id}>
                    {placeholder}
                </label>
            </div>
        </div>
    );
};

export { InputForm };
