import {Layout} from "widgets/layout";
import {AuthForm} from "widgets/authForm";

export const Auth = () => {
	return (
		<Layout isShowFooter={false}>
            <AuthForm />
		</Layout>
	)
}
