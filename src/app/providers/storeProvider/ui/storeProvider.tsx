import { Provider } from "react-redux";
import { store } from "../store";
import type { ReactNode } from "react";

type Props = {
    children: ReactNode;
};

export const StoreProvider = ({ children }: Props): ReactNode => {
    return <Provider store={store}>{children}</Provider>;
};
