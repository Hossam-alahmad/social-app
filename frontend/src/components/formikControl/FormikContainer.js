import { Formik } from "formik";

const FormikContainer = ({
    initialValues,
    onSubmit,
    validationSchema,
    children,
    ...rest
}) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            {...rest}
        >
            {children}
        </Formik>
    );
};

export default FormikContainer;
