import {Routes, Route} from "react-router-dom";
import {Home} from "pages/home";
import {Error} from "pages/error";
import {Auth} from "pages/auth";
import {Register} from "pages/register";
import {Agreement} from "pages/agreement";
import {Policy} from "pages/policy";

export const RouterProvider = () => {
	return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/register" element={<Register />} />
            <Route path="/agreement" element={<Agreement />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="*" element={<Error />} />
        </Routes>
	)
}
