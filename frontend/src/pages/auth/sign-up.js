import FormikContainer from "../../components/formikControl/FormikContainer";
import * as Yup from "yup";
import FieldContainer from "../../components/formikControl/FieldContainer";
import { Form } from "formik";
import authServices from "../../services/auth";
import { icons } from "../../utils/icons";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getCookie } from "../../utils/cookies";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    location: "",
    occupation: "",
    password: "",
};
const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("This field required").min(2).max(50),
    lastName: Yup.string().required("This field required").min(2).max(50),
    email: Yup.string()
        .email("Email not valid")
        .required("This field required"),
    location: Yup.string().required("This field required"),
    occupation: Yup.string().required("This field required"),
    password: Yup.string()
        .min(5, "Password must be 5 characters long")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol")
        .required("This field required"),
});
const SignUp = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const cookies = getCookie("token");
        if (cookies !== "") {
            navigate("/", { replace: true });
        }
    }, []);
    const onSubmit = (values, { setFieldError, setSubmitting }) => {
        authServices
            .register(values)
            .then(res => {
                toast.success("Register successfully");
                setTimeout(() => {
                    navigate("/login", { replace: true });
                }, 1500);
            })
            .catch(err => {
                const msg = err.response?.data?.message || "Server Error";
                if (msg.toLowerCase().includes("email"))
                    setFieldError("email", msg);
                else if (msg.includes("password"))
                    setFieldError("password", msg);
                else toast.error(msg.slice(0, 100));
            });
        setTimeout(() => {
            setSubmitting(false);
        }, 1500);
    };
    return (
        <div className="py-10">
            <div className="relative bg-white w-3/4 md:w-2/4 shadow-sm rounded-sm p-4 mx-auto dark:bg-secondry-dark ">
                <h2 className="text-center mb-4">Sign Up</h2>
                <FormikContainer
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {({ isSubmitting }) => {
                        return (
                            <Form>
                                <div className="grid grid-cols-2 gap-4">
                                    <FieldContainer
                                        type="text"
                                        label="Firstname"
                                        name="firstName"
                                        required={true}
                                    />
                                    <FieldContainer
                                        type="text"
                                        label="Lastname"
                                        name="lastName"
                                        required={true}
                                    />
                                </div>
                                <FieldContainer
                                    type="text"
                                    label="Email"
                                    name="email"
                                    required={true}
                                />
                                <FieldContainer
                                    type="text"
                                    label="Location"
                                    name="location"
                                    required={true}
                                />
                                <FieldContainer
                                    type="text"
                                    label="Occupation"
                                    name="occupation"
                                    required={true}
                                />
                                <FieldContainer
                                    type="password"
                                    label="Password"
                                    name="password"
                                    required={true}
                                />
                                <button
                                    type="submit"
                                    className="w-full flex justify-center transition-all bg-primary hover:opacity-90 p-1 rounded-sm text-secondry-font"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="p-1 text-lg animate-spin">
                                            {icons.spinner}
                                        </span>
                                    ) : (
                                        "Sign Up"
                                    )}
                                </button>
                            </Form>
                        );
                    }}
                </FormikContainer>
            </div>
        </div>
    );
};

export default SignUp;
