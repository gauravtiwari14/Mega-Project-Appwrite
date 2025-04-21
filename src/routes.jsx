import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import AllPosts from "./pages/AllPosts";
import EditPost from "./pages/EditPost";
import NotFound from "./pages/NotFound";  // Create this for 404 handling

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: "posts", element: <AllPosts /> },
            { path: "post/:slug", element: <EditPost /> },
            { path: "*", element: <NotFound /> }, // Handles 404
        ],
    },
]);

export default router;
