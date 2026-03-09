import {Layout} from "widgets/layout";
import {ErrorInfo} from "widgets/errorInfo";

export const Error = () => {
	return (
		<Layout isShowFooter={false}>
            <ErrorInfo />
		</Layout>
	)
}
