import React, { memo } from "react";
import avatar from "../../assets/images/avatar/avatar.svg";
import moment from "moment";
import { Link } from "react-router-dom";
const Index = ({ postInfo }) => {
    return (
        <div className="comments mt-4">
            {postInfo.comments
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(p => {
                    console.log(p);
                    return (
                        <div
                            key={p.userId}
                            className="flex mb-4  p-2 bg-slate-100 dark:bg-slate-700 rouned-sm "
                        >
                            <Link to={`/profile/${p.userId}`}>
                                <img
                                    src={
                                        p.userImage
                                            ? process.env
                                                  .REACT_APP_BACKEND_API +
                                              p.userImage
                                            : avatar
                                    }
                                    alt="user image"
                                    className="rounded-full w-[40px] h-[40px] mr-2 object-cover"
                                />
                            </Link>
                            <div>
                                {" "}
                                <h5 className="mb-0">
                                    <Link to={`/profile/${p.userId}`}>
                                        {p.fullname}
                                    </Link>
                                </h5>
                                <span className="text-[0.6rem] text-slate-500 dark:text-slate-400">
                                    {moment(p.date).fromNow()}
                                </span>
                                <p className="mt-2 text-sm">{p.comment}</p>
                            </div>
                        </div>
                    );
                })}
        </div>
    );
};

export default memo(Index);
