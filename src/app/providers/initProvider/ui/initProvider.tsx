import type { ReactNode } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserInfo } from "entities/user";
import { userMock } from "entities/user";

type Props = {
    children: ReactNode;
};

const InitProvider = ({ children }: Props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setUserInfo(userMock));
    }, [dispatch]);

    return <>{children}</>;
};

export { InitProvider };
