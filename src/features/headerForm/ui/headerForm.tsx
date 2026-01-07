import { useRef } from "react";
import classes from "./headerForm.module.scss";
import searchIcon from "shared/icons/search-white.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { headerFormHandler } from "../model/headerFormHandler";
import { headerInputHandler } from "../model/headerInputHandler";
import { headerButtonHandler } from "../model/headerButtonHandler";
import { selectSearchText } from "../model/selectors";
import { useTranslation } from "react-i18next";

const HeaderForm = () => {
	const { t } = useTranslation();

    const dispatch = useDispatch();
    const searchRef = useRef(null);
    const searchText = useSelector(selectSearchText);
    const navigate = useNavigate();

    return (
        <form
            onSubmit={e => headerFormHandler(e, dispatch, searchText, navigate)}
            className={classes.header__form}
            action="#"
            method="get"
        >
            <input
                onChange={e => headerInputHandler(e, dispatch)}
                value={searchText}
                className={classes.header__search}
                type="text"
                placeholder={t("headerInputPlaceholder")}
            ></input>
            <Link
                ref={searchRef}
                to={`/gallery?search=${searchText}`}
                className={classes.header__submit}
                onClick={e => headerButtonHandler(e, dispatch, searchText, navigate)}
            >
                <img src={searchIcon} alt={t("Find")} className={classes.header__submitImg}></img>
            </Link>
        </form>
    );
};

export { HeaderForm };
