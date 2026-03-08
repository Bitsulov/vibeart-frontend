import {Layout} from "widgets/layout";
import {HomeIntro} from "widgets/homeIntro";
import {HomeSteps} from "widgets/homeSteps";
import {HomeReviews} from "widgets/homeReviews";
import {HomeCTA} from "widgets/homeCTA";

export const Home = () => {
	return (
		<Layout>
            <HomeIntro />
            <HomeSteps />
            <HomeReviews />
            <HomeCTA />
		</Layout>
	)
}
