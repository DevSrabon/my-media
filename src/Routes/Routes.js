import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Page404 from "../pages/Shared/Page404";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <Page404/>

    }
])