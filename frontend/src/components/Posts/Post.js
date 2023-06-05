import React, { memo, useState } from "react";
import avatar from "../../assets/images/avatar/avatar.svg";
import moment from "moment";
import { Link } from "react-router-dom";
import { icons } from "../../utils/icons";
import postsServices from "../../services/posts";
import { useQueryClient } from "react-query";
import FormikContainer from "../formikControl/FormikContainer";
import { Form } from "formik";
import FieldContainer from "../formikControl/FieldContainer";
import Comments from "../Comments";
import { useSelector } from "react-redux";

const initialValues = {
    comment: "",
};

const Post = ({ data }) => {
    const queryClient = useQueryClient();
    const [openComment, setOpenComment] = useState(false);
    const { user } = useSelector(state => state.auth);
    const profilePath =
        data.userId === user?._id ? "/profile" : "/profile/" + data.userId;
    const likeClickHandler = () => {
        postsServices
            .addRemoveLike(data._id, data.userId)
            .then(res => queryClient.refetchQueries("getPosts"))
            .catch(err => console.log(err));
    };
    const onSubmit = values => {
        if (values.comment !== "") {
            const postData = {
                userId: data.userId,
                comment: {
                    fullname: user.firstname + " " + user.lastname,
                    comment: values.comment,
                    date: new Date(),
                    userImage: user.picturePath,
                    userId: user?._id,
                },
            };
            postsServices
                .addComment(data._id, postData)
                .then(res => {
                    if (res.status === 200) {
                        setOpenComment(false);
                        queryClient.refetchQueries("getPosts");
                    }
                })
                .catch(err => console.log(err));
        }
    };
    return (
        <div className="post p-4 bg-white dark:bg-secondry-dark rounded-sm shadow-sm mb-4">
            <div className="flex mb-6">
                <Link to={profilePath}>
                    <img
                        className="w-[50px] h-[50px] rounded-full mr-2"
                        src={
                            data?.userPicturePath
                                ? process.env.REACT_APP_BACKEND_API +
                                  data.userPicturePath
                                : avatar
                        }
                        alt={"user image"}
                    />
                </Link>
                <div className="user-info">
                    <h4 className="mt-1">
                        <Link to={profilePath}>
                            {data.firstname} {data.lastname}
                        </Link>
                    </h4>
                    <span className="text-slate-400">
                        {moment(data.createdAt).fromNow()}
                    </span>
                </div>
            </div>
            <div className="content">
                <p className="mb-4">{data.description}</p>
                {data.picturePath !== "" && (
                    <img
                        src={
                            process.env.REACT_APP_BACKEND_API + data.picturePath
                        }
                        className="w-full max-h-[400px] object-scale-down mb-6"
                        alt="picture post"
                    />
                )}
                <div className="flex justify-between items-center text-slate-600">
                    <div className="flex">
                        <button
                            onClick={likeClickHandler}
                            className="text-xl mr-2 flex items-center"
                        >
                            {data.likes[data.userId]
                                ? icons.fillLike
                                : icons.like}{" "}
                            <span className="ml-1 text-lg">
                                {Object.keys(data.likes).length}
                            </span>
                        </button>
                        <button
                            onClick={() =>
                                setOpenComment(prevState => !prevState)
                            }
                            className="text-xl flex items-center"
                        >
                            {icons.comment}{" "}
                            <span className="ml-1 text-lg">
                                {data.comments.length}
                            </span>
                        </button>
                    </div>
                    <button className="text-xl">{icons.share}</button>
                </div>
                {openComment && (
                    <div className="mt-4">
                        <FormikContainer
                            onSubmit={onSubmit}
                            initialValues={initialValues}
                        >
                            <Form>
                                <div className="flex items-start gap-2">
                                    <FieldContainer
                                        type="text"
                                        placeholder="type comment..."
                                        name="comment"
                                        customStyle="p-2"
                                    />
                                    <button
                                        type="submit"
                                        className="p-2 bg-primary  w-auto rounded-full text-white"
                                    >
                                        Comment
                                    </button>
                                </div>
                            </Form>
                        </FormikContainer>
                    </div>
                )}
                {data.comments.length > 0 && <Comments postInfo={data} />}
            </div>
        </div>
    );
};

export default memo(Post);
