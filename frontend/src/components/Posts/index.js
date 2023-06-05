import React, { memo } from "react";

import SkeletonPost from "./SkeletonPost";
import Post from "./Post";
const Index = ({ data, isLoading, error }) => {
    return (
        <div className="posts">
            {error ? (
                <div className="p-4 bg-white dark:bg-secondry-dark rounded-sm shadow-sm">
                    <p>Connot get posts right now</p>
                </div>
            ) : isLoading ? (
                Array(2)
                    .fill(1)
                    .map((value, index) => <SkeletonPost key={index} />)
            ) : (
                data.map(d => <Post data={d} key={d._id} />)
            )}
        </div>
    );
};

export default memo(Index);
