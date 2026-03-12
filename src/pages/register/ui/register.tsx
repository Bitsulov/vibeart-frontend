import {Layout} from "widgets/layout";
import {RegisterForm} from "widgets/registerForm";

export const Register = () => {
	return (
		<Layout isShowFooter={false}>
			<RegisterForm />
		</Layout>
	)
}
