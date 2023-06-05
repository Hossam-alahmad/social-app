import React from "react";

const Index = ({ customStyle }) => {
    return (
        <div
            className={`w-[50px] h-[50px] bg-slate-300 dark:text-slate-600 animate-pulse rounded-full ${customStyle}`}
        ></div>
    );
};

export default Index;
