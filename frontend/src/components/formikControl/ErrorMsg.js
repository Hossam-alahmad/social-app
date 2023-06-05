import React from "react";

const ErrorMsg = ({ children }) => {
    return <span className="text-danger text-xs">{children}</span>;
};

export default ErrorMsg;
