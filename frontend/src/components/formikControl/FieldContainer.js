import React from "react";
import TextField from "./Fields/TextField";
import FileField from "./Fields/FileField";
import TextArea from "./Fields/TextArea";

const FieldContainer = ({ type, name, label, fileRef, ...rest }) => {
    switch (type) {
        case "text":
        case "password":
            return (
                <TextField type={type} label={label} name={name} {...rest} />
            );
        case "textarea":
            return <TextArea type={type} label={label} name={name} {...rest} />;
        case "file":
            return (
                <FileField ref={fileRef} label={label} name={name} {...rest} />
            );
    }
};

export default FieldContainer;
