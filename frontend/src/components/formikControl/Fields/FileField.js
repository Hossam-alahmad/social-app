import { ErrorMessage, Field, useField } from "formik";
import React, { forwardRef } from "react";
import ErrorMsg from "../ErrorMsg";

const FileField = forwardRef(
    ({ name, label, id, customStyle, ...rest }, ref) => {
        const [, , field] = useField(name);
        return (
            <div>
                {label && <label htmlFor={id}>{label}</label>}
                <input
                    type="file"
                    name={name}
                    hidden
                    id={id}
                    {...rest}
                    className={customStyle}
                    onChange={e => {
                        field.setValue(e.target.files);
                    }}
                    ref={ref}
                />

                <ErrorMessage name={name} component={ErrorMsg} />
            </div>
        );
    }
);

export default FileField;
