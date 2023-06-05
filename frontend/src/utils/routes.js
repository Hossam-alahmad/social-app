import { lazy } from "react";

const Home = lazy(() => import("../pages/home"));
const Profile = lazy(() => import("../pages/profile"));
const MyProfile = lazy(() => import("../pages/myProfile"));

export const routes = [
    {
        id: 1,
        name: "Home",
        path: "/",
        index: true,
        element: <Home />,
    },
    {
        id: 2,
        name: "Profile",
        path: "/profile",
        element: <MyProfile />,
    },
    {
        id: 2,
        name: "Profile",
        path: "/profile/:userId",
        element: <Profile />,
    },
];
