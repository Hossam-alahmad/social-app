import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../../utils/cookies";
import { useDispatch, useSelector } from "react-redux";
import DropDown from "../DropDown";
import avatar from "../../assets/images/avatar/avatar.svg";
import { MenuItem } from "@chakra-ui/react";
import { setLogout, setMode } from "../../redux/slicers";
import { icons } from "../../utils/icons";

const Index = () => {
    const { user, mode } = useSelector(state => state.auth);
    const _dispatch = useDispatch();
    const navigate = useNavigate();

    const changeModeHandler = () => {
        const newMode = mode === "dark" ? "light" : "dark";
        _dispatch(setMode(newMode));
        document.documentElement.classList.remove(mode);
        document.documentElement.classList.add(newMode);
    };
    const logoutHandler = () => {
        _dispatch(setLogout());
        setCookie("token", "", -1);
        navigate("/login", { replace: true });
    };
    return (
        <div className="p-4 bg-white shadow-sm dark:bg-secondry-dark">
            <div className="flex items-center justify-between">
                <h1 className="text-primary">
                    <Link to="/">
                        Social{" "}
                        <span className="text-[1.4rem] sm:text-[1.8rem] text-secondry dark:text-d-primary-font">
                            App
                        </span>
                    </Link>
                </h1>
                {!user ? (
                    <ul className="flex items-center justify-between">
                        <li>
                            <Link
                                to="/login"
                                className="p-2 transition-all hover:text-primary"
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/sign-up"
                                className="p-2  transition-all hover:text-primary"
                            >
                                Sign Up
                            </Link>
                        </li>
                    </ul>
                ) : (
                    <div className="profile cursor-pointer">
                        <DropDown
                            button={
                                <img
                                    className="rounded-full w-[50px] h-[50px] object-cover"
                                    src={
                                        user?.picturePath
                                            ? process.env
                                                  .REACT_APP_BACKEND_API +
                                              user.picturePath
                                            : avatar
                                    }
                                    alt={"user image"}
                                />
                            }
                            isLoading={user ? false : true}
                        >
                            <h4 className="text-slate-400 px-2 border-b mb-2">
                                {user?.firstname + " " + user?.lastname}
                            </h4>
                            <MenuItem
                                onClick={changeModeHandler}
                                className="hover:bg-slate-200 p-2 hover:dark:bg-third-dark w-full text-start"
                            >
                                <span className="text-lg mr-1">
                                    {mode === "dark" ? icons.dark : icons.light}
                                </span>{" "}
                                {mode[0].toUpperCase() + mode.slice(1)} mode
                            </MenuItem>
                            <MenuItem className="hover:bg-slate-200 hover:dark:bg-third-dark p-2">
                                <Link
                                    to={"/profile"}
                                    className="w-full flex items-center"
                                >
                                    <span className="text-lg mr-1">
                                        {icons.user}
                                    </span>{" "}
                                    My Profile
                                </Link>
                            </MenuItem>
                            <MenuItem
                                onClick={logoutHandler}
                                className="hover:bg-slate-200 hover:dark:bg-third-dark p-2"
                            >
                                <span className="text-lg mr-1">
                                    {icons.logout}
                                </span>{" "}
                                Logout
                            </MenuItem>
                        </DropDown>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Index;
