import { useEffect, useRef, useState } from "react";
import c from "./languageChangerSelect.module.scss";
import { useTranslation } from "react-i18next";
import { languages } from "../config/languages";
import { selectButtonHandler } from "../model/selectButtonHandler";
import { changeLanguageHandler } from "../model/changeLanguageHandler";

export const LanguageChangerSelect = ({ ...props }) => {
    const { i18n } = useTranslation();

    const [listHeight, setListHeight] = useState<number>(0);
    const listRef = useRef<HTMLUListElement>(null);
    const [isSelectOpen, setIsSelectOpen] = useState<boolean>(true);
    const [currentLanguage, setCurrentLanguage] = useState<string>(i18n.language);

    useEffect(() => {
        const list = listRef.current;

        setTimeout(() => {
            if (list !== null) {
                const style = window.getComputedStyle(list);
                setListHeight(list.scrollHeight + +style.paddingTop.replace("px", ""));
            }
            setIsSelectOpen(false);
        }, 300);
    }, []);

    return (
        <div className={c.selectWrapper} {...props}>
            <button
                onClick={e => selectButtonHandler(e, setIsSelectOpen)}
                className={c.selectButton}
                aria-expanded="false"
                aria-haspopup="listbox"
            >
                <span className={`fi fi-${currentLanguage} ${c.currentValue}`}></span>
                <span className={c.arrow} aria-hidden="true">
                    {isSelectOpen ? "▲" : "▼"}
                </span>
            </button>
            <ul
                className={isSelectOpen ? `${c.options} ${c.open}` : c.options}
                role="listbox"
                aria-hidden="true"
                ref={listRef}
                style={{ height: isSelectOpen ? listHeight : "0" }}
            >
                {Object.values(languages).map(lang => (
                    <li
                        onClick={e =>
                            changeLanguageHandler(
                                e,
                                i18n,
                                lang.shortName,
                                lang.shortCountry,
                                setCurrentLanguage,
                                setIsSelectOpen
                            )
                        }
                        key={lang.shortName}
                        className={`${lang.className} ${c.option}`}
                        role="option"
                        tabIndex={0}
                    ></li>
                ))}
            </ul>
        </div>
    );
};
