import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Page404 from "../pages/Shared/Page404";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		errorElement: <Page404 />,
		children: [
			{
				path: "/",
				element: (
					<PrivateRoute>
						<Home />
					</PrivateRoute>
				),
			},
			{
				path: "/signup",
				element: <SignUp />,
			},
			{
				path: "/login",
				element: <Login />,
			},
		],
	},
]);