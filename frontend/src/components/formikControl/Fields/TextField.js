import React from "react";
import { ErrorMessage, Field } from "formik";
import ErrorMsg from "../ErrorMsg";
const TextField = ({
    type,
    label,
    id,
    name,
    required,
    customStyle,
    ...rest
}) => {
    return (
        <div className="field-group mb-4 w-full">
            {label && (
                <label htmlFor={id} className="block text-sm mb-1">
                    {label}
                    {required && <span className="text-danger">*</span>}:
                </label>
            )}
            <Field
                className={`block w-full border outline-none transition-all focus:shadow p-1 border-primary-border rounded-sm dark:bg-third-dark dark:border-primary-border-dark ${customStyle}`}
                type={type}
                name={name}
                id={id}
                {...rest}
            />
            <ErrorMessage name={name} component={ErrorMsg} />
        </div>
    );
};

export default TextField;
