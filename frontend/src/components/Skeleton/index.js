import React, { memo } from "react";

const Index = ({ isLoading, customStyle, children }) => {
    return isLoading ? (
        children
    ) : (
        <div
            className={`w-full h-[20px] animate-pulse dark:text-slate-600 bg-slate-300 rounded-sm mb-2 ${customStyle}`}
        ></div>
    );
};

export default memo(Index);
