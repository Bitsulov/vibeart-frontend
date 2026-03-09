import {Routes, Route} from "react-router-dom";
import {Home} from "pages/home";
import {Error} from "pages/error";

export const RouterProvider = () => {
	return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Error />} />
        </Routes>
	)
}
