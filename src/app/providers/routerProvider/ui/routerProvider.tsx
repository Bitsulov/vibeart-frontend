import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

export const RouterProvider = () => {
	return (
		<Router>
            <Routes>
                <Route path="/" element={<div></div>} />
            </Routes>
        </Router>
	)
}
