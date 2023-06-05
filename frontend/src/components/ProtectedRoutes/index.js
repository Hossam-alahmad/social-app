import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../utils/cookies";

const Index = () => {
    const token = getCookie("token");
    return token !== "" ? <Outlet /> : <Navigate to={"/login"} />;
};

export default Index;
