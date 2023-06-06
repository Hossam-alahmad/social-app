import React from "react";
import { useQueries } from "react-query";
import { Navigate, useParams } from "react-router-dom";
import userServices from "../services/user";
import postServices from "../services/posts";

import UserAsideInfo from "../components/UserAsideInfo";
import Loading from "../components/Loading";
import PostForm from "../components/PostForm";
import Posts from "../components/Posts";

const Profile = () => {
    document.title = "Social App | Profile";

    const { userId } = useParams();
    const results = useQueries([
        {
            queryKey: ["getUserInfo", userId],
            queryFn: async () => {
                return await userServices.getUser(userId);
            },
        },
        {
            queryKey: ["getUserPosts", userId],
            queryFn: async () => {
                return await postServices.getUserPosts(userId);
            },
        },
    ]);
    const [
        { data: userData, isLoading: userIsLoading },
        { data: postsData, isLoading: postsIsLoading, error: postsError },
    ] = results;

    return userIsLoading && postsIsLoading ? (
        <Loading />
    ) : (
        <div className="grid lg:grid-cols-3 gap-2 p-10">
            <div>
                <UserAsideInfo user={userData} />
            </div>
            <div className="posts  lg:col-span-2">
                <Posts
                    data={postsData}
                    isLoading={postsIsLoading}
                    error={postsError}
                />
            </div>
        </div>
    );
};

export default Profile;
