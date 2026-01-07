import { Layout } from "widgets/layout";
import classes from "./communities.module.scss";
import { useLoadPageStatus } from "entities/pageStats";
import { CommunitiesListOver } from "widgets/communitiesListOver";
import { useState } from "react";
import { communitiesMock } from "entities/community";
import { CommunitiesList } from "widgets/communitiesList";

export const Communities = () => {
	const isPageLoaded = useLoadPageStatus();

	const [communitiesList, setCommunitiesList] = useState(communitiesMock);

	return (
		<Layout pageStatus={isPageLoaded}>
			<main className={classes.communities}>
				<section className={classes.communitiesContainer}>
					<CommunitiesListOver fullCommunitiesList={communitiesMock} setCommunitiesList={setCommunitiesList} />
					<CommunitiesList communitiesList={communitiesList} />
				</section>
			</main>
		</Layout>
	)
}
