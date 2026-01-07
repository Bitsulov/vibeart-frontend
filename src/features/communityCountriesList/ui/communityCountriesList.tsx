import type { countriesKeys } from "shared/lib/countriesKeys";
import classes from "./communityCountriesList.module.scss";
import { useTranslation } from "react-i18next";

interface CommunityCountriesListPropsType {
    countriesList: (typeof countriesKeys)[number][] | "WholeWorld";
}

const CommunityCountriesList = ({ countriesList, ...props }: CommunityCountriesListPropsType) => {
	const { t } = useTranslation();

    return (
        <ul className={classes.countryList} {...props}>
            {countriesList !== "WholeWorld" ? (
                countriesList.map(country => (
                    <li key={country} className={classes.countryItem}>
                        {t(country)}
                    </li>
                ))
            ) : (
                <li className={classes.countryItem}>{t("WholeWorld")}</li>
            )}
        </ul>
    );
};

export { CommunityCountriesList };
