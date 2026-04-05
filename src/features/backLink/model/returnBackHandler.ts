import type {NavigateFunction} from "react-router-dom";

export function returnBackHandler(navigate: NavigateFunction) {
     navigate(-1);
}
