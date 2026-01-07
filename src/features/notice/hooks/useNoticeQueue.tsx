import { useSelector, useDispatch } from "react-redux";
import { selectIsNewNotice, selectNoticeMessage, selectNoticesQueue, selectShowNotice } from "../model/selectors";
import { resetNewNotice, setCurrentMessageNotice, setNoticesQueue } from "../model/noticeSlice";
import { useEffect, useState } from "react";
import { showNoticeFunc } from "../lib/showNotice";

const useNoticeQueue = () => {
    const [loaded, setLoaded] = useState(false);
    const queue = useSelector(selectNoticesQueue);
    const noticeMessageNew = useSelector(selectNoticeMessage);
    const isNewNotice = useSelector(selectIsNewNotice);
    const showNotice = useSelector(selectShowNotice);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isNewNotice && loaded && noticeMessageNew) {
            if (!queue.includes(noticeMessageNew)) {
                dispatch(setNoticesQueue([...queue, noticeMessageNew]));
            }
            dispatch(resetNewNotice());
        } else {
			setLoaded(true);
		}
    }, [isNewNotice, loaded, noticeMessageNew, queue, dispatch]);

    useEffect(() => {
        if (loaded && !showNotice && queue.length > 0) {
            dispatch(setCurrentMessageNotice(queue[0]));
            dispatch(setNoticesQueue(queue.slice(1)));
            showNoticeFunc(dispatch);
        }
    }, [queue, showNotice, loaded, dispatch]);
};

export { useNoticeQueue };
