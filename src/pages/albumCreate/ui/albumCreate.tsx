import {Layout} from "widgets/layout";
import {Develop} from "widgets/develop";
import {useTranslation} from "react-i18next";

export const AlbumCreate = () => {
    const { t } = useTranslation();

	return (
		<Layout>
            <title>{t("titles.albumCreate")}</title>
			<Develop />
		</Layout>
	)
}
