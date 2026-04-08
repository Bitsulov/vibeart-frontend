import c from "./searchInput.module.scss";
import {Search} from "lucide-react";
import {useTranslation} from "react-i18next";
import React from "react";

interface SearchInputProps {
    placeholder?: string;
    className?: string;
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export const SearchInput = ({
    value,
    onChange,
    className = "",
    placeholder = "",
    ...props
}: SearchInputProps) => {
    const { t } = useTranslation();

	return (
        <div className={`${c.wrapper} ${className}`}>
            <Search className={c.icon} width="24" height="24" aria-hidden={false} />
            <input
                value={value}
                onChange={onChange}
                placeholder={placeholder || t("searchPlaceholder")}
                className={c.input}
                {...props}
            />
        </div>
    )
}
