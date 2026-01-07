import type { Dispatch } from "redux";
import { setSearchText } from "./headerFormSlice";

function headerInputHandler(e: React.ChangeEvent<HTMLInputElement>, dispatch: Dispatch) {
    dispatch(setSearchText(e.target.value));
}

export { headerInputHandler };
