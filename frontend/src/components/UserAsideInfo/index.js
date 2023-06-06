import React, { useEffect, useRef } from "react";
import avatar from "../../assets/images/avatar/avatar.svg";
import Skeleton from "../Skeleton";
import Divider from "../Divider";
import { icons } from "../../utils/icons";
import SkeletonCircle from "../SkeletonCircle";
import { useQuery, useQueryClient } from "react-query";
import userServices from "../../services/user";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setLogin } from "../../redux/slicers";

const validFileExtensions = ["jpg", "gif", "png", "jpeg", "svg", "webp"];
const MAX_FILE_SIZE = 1024000; //1mb

const Index = ({ user }) => {
    const _dispatch = useDispatch();
    const isLoaded = user ? true : false;
    const queryClient = useQueryClient();
    const { user: currentUser, token } = useSelector(state => state.auth);
    const fileRef = useRef();
    const profilePath =
        currentUser?._id === user?._id ? "/profile" : `/profile/${user?._id}`;
    const { data, isLoading, error } = useQuery(
        ["getUserFriends", user],
        async () => {
            return await userServices.getFriends(user?._id);
        },
        {
            staleTime: 10000,
        }
    );
    useEffect(() => {
        if (
            fileRef.current &&
            fileRef.current.files[0] &&
            currentUser?._id === user?._id
        ) {
            uploadImage();
        }
    }, [fileRef.current?.files[0]]);
    const uploadImage = () => {
        const file = fileRef.current.files[0];
        const fileExtension = file.type.split("/")[1];
        if (
            validFileExtensions.includes(fileExtension) &&
            MAX_FILE_SIZE > file.size
        ) {
            const formData = new FormData();
            formData.append("id", currentUser._id);
            formData.append("userImage", file);
            userServices
                .uploadProfileImage(formData)
                .then(res => {
                    _dispatch(setLogin({ user: res.data, token: token }));
                    localStorage.setItem(
                        "social-app-user",
                        JSON.stringify(res.data)
                    );
                    queryClient.refetchQueries("getPosts");
                })
                .catch(err => console.log(err));
        }
    };
    const addRemoveFriend = () => {
        userServices
            .addRemoveFriend(currentUser._id, user._id)
            .then(res =>
                queryClient.refetchQueries(["getUserFriends", "getPosts"])
            )
            .catch(err => console.log(err));
    };
    return (
        <div>
            <div className="col-span-1 bg-white dark:bg-secondry-dark shadow-sm p-4 rouned-sm mb-4">
                <div className="flex items-center justify-between">
                    <div className="flex">
                        <div className="relative">
                            <img
                                src={
                                    user?.picturePath
                                        ? process.env.REACT_APP_BACKEND_API +
                                          user?.picturePath
                                        : avatar
                                }
                                alt="user img"
                                className="w-[50px] h-[50px] rounded-full mr-2 object-cover"
                            />
                            {currentUser?._id === user?._id && (
                                <div className="absolute group flex items-center justify-center top-0  left-0 w-[50px] h-[50px] cursor-pointer hover:bg-slate-400 hover:dark:bg-slate-600 opacity-70 rounded-full">
                                    <input
                                        ref={fileRef}
                                        type="file"
                                        className="w-full h-full absolute"
                                        hidden
                                    />
                                    <button
                                        onClick={() => fileRef.current.click()}
                                        className="invisible relative group-hover:visible dark:text-primary  text-xl"
                                    >
                                        {icons.imgFill}
                                    </button>
                                </div>
                            )}
                        </div>
                        <div>
                            <Skeleton isLoading={isLoaded}>
                                <h3>
                                    <Link to={profilePath}>
                                        {" "}
                                        {user?.firstname} {user?.lastname}
                                    </Link>
                                </h3>
                            </Skeleton>
                            <Skeleton isLoading={isLoaded}>
                                <span className="text-slate-600 dark:text-slate-400">
                                    {data?.length} Friends
                                </span>
                            </Skeleton>
                        </div>
                    </div>
                    {currentUser?._id !== user?._id && (
                        <button
                            onClick={addRemoveFriend}
                            className="text-lg w-[40px] h-[40px] flex justify-center items-center hover:text-primary bg-slate-200 dark:bg-slate-700 rounded-full"
                        >
                            {isLoading ? (
                                <SkeletonCircle />
                            ) : data?.some(f =>
                                  f.friends.includes(user?._id)
                              ) ? (
                                icons.removeUser
                            ) : (
                                icons.addUser
                            )}
                        </button>
                    )}
                </div>
                <Divider />
                <ul>
                    <li className="flex items-center mb-4">
                        <Skeleton isLoading={isLoaded}>
                            <span className="text-xl mr-2">
                                {icons.location}
                            </span>{" "}
                            <p className="text-slate-500 dark:text-slate-400">
                                {user?.location}
                            </p>
                        </Skeleton>
                    </li>
                    <li className="flex items-center">
                        <Skeleton isLoading={isLoaded}>
                            <span className="text-xl mr-2">
                                {icons.briefcase}
                            </span>{" "}
                            <p className="text-slate-500 dark:text-slate-400">
                                {user?.occupation}
                            </p>
                        </Skeleton>
                    </li>
                </ul>
                <Divider />
                <div className="mb-4">
                    <Skeleton isLoading={isLoaded}>
                        <div className="mb-2 flex justify-between items-center">
                            <p className=" text-[.8rem] text-slate-500  dark:text-slate-400">
                                Who's viewed your profile
                            </p>{" "}
                            <p className=" text-[.9rem]">
                                {user?.viewedProfile}
                            </p>
                        </div>
                    </Skeleton>
                    <Skeleton isLoading={isLoaded}>
                        <div className="flex justify-between items-center">
                            <p className=" text-[.8rem] text-slate-500  dark:text-slate-400">
                                Impression of your posts
                            </p>{" "}
                            <p className=" text-[.9rem]">{user?.impressions}</p>
                        </div>
                    </Skeleton>
                </div>
            </div>
            <div className="col-span-1 bg-white dark:bg-secondry-dark shadow-sm p-4 rouned-sm mb-4">
                <h3 className="mb-4">Friends List</h3>
                {isLoading ? (
                    Array(3)
                        .fill(1)
                        .map((value, index) => (
                            <div className="flex mb-4" key={index}>
                                <SkeletonCircle customStyle="mr-2 " />
                                <div className="w-full">
                                    <Skeleton />
                                    <Skeleton />
                                </div>
                            </div>
                        ))
                ) : error || data?.length === 0 ? (
                    <p>No friends in your list</p>
                ) : (
                    data.map(f => (
                        <div className="flex mb-4" key={f._id}>
                            <img
                                src={
                                    f.picturePath
                                        ? process.env.REACT_APP_BACKEND_API +
                                          f.picturePath
                                        : avatar
                                }
                                alt="user img"
                                className="w-[50px] h-[50px] rounded-full mr-2 object-cover"
                            />
                            <div>
                                <h4>
                                    {f.firstname} {f.lastname}
                                </h4>
                                <span className="text-slate-600 dark:text-slate-400">
                                    {f.location}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Index;
