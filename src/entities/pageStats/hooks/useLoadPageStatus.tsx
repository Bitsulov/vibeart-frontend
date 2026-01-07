import { useSelector, useDispatch } from "react-redux";
import { selectIsLoaded } from "../model/selectors";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { setIsLoaded } from "../model/pageStatsSlice";

export const useLoadPageStatus = () => {
    const isLoadedPage = useSelector(selectIsLoaded);
    const location = useLocation();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setIsLoaded(false));
    }, [location]);

    return isLoadedPage;
};
