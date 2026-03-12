import {Routes, Route} from "react-router-dom";
import {Home} from "pages/home";
import {Error} from "pages/error";
import {Auth} from "pages/auth";
import {Register} from "pages/register";

export const RouterProvider = () => {
	return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Error />} />
        </Routes>
	)
}
