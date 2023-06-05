import React, { memo } from "react";
import Skeleton from "../Skeleton";
import SkeletonCircle from "../SkeletonCircle";

const SkeletonPost = () => {
    return (
        <div className="p-4 bg-white dark:bg-secondry-dark rounded-sm shadow-sm mb-4">
            <div className="flex mb-4">
                <SkeletonCircle customStyle="mr-2" />
                <div className="w-full">
                    <Skeleton customStyle="mt-1 max-w-[300px] h-[15px]" />
                    <Skeleton customStyle=" max-w-[200px]  h-[15px]" />
                </div>
            </div>
            <Skeleton customStyle="h-[15px]" />
            <Skeleton customStyle="h-[15px]" />
            <Skeleton customStyle="h-[15px]" />
            <Skeleton customStyle="h-[15px]" />
            <Skeleton customStyle="h-[300px]" />
        </div>
    );
};

export default memo(SkeletonPost);
