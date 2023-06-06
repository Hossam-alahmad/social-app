import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import postsServices from "../services/posts";
import UserAsideInfo from "../components/UserAsideInfo";
import Loading from "../components/Loading";
import PostForm from "../components/PostForm";
import Posts from "../components/Posts";
const MyProfile = () => {
    document.title = "Social App | Profile";

    const { user } = useSelector(state => state.auth);
    const { data, isLoading, error } = useQuery(
        ["getUserPosts", user],
        async () => {
            return await postsServices.getUserPosts(user._id);
        }
    );
    return (
        <div className="grid lg:grid-cols-3 gap-2 p-10">
            <div>
                <UserAsideInfo user={user} />
            </div>
            <div className="posts  lg:col-span-2">
                <PostForm user={user} />
                <Posts data={data} isLoading={isLoading} error={error} />
            </div>
        </div>
    );
};

export default MyProfile;
