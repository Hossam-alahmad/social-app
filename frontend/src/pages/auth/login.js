import FormikContainer from "../../components/formikControl/FormikContainer";
import * as Yup from "yup";
import FieldContainer from "../../components/formikControl/FieldContainer";
import { Form } from "formik";
import authServices from "../../services/auth";
import { getCookie, setCookie } from "../../utils/cookies";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { icons } from "../../utils/icons";
import { useDispatch } from "react-redux";
import { setLogin } from "../../redux/slicers";
import { useEffect } from "react";
const initialValues = {
    email: "",
    password: "",
};
const validationSchema = Yup.object().shape({
    email: Yup.string()
        .email("Email not valid")
        .required("This field required"),
    password: Yup.string()
        .min(5, "Password must be 5 characters long")
        .matches(/[0-9]/, "Password requires a number")
        .matches(/[a-z]/, "Password requires a lowercase letter")
        .matches(/[A-Z]/, "Password requires an uppercase letter")
        .matches(/[^\w]/, "Password requires a symbol")
        .required("This field required"),
});
const Login = () => {
    const _dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const cookies = getCookie("token");
        if (cookies !== "") {
            navigate("/", { replace: true });
        }
    }, []);
    const onSubmit = (values, { setFieldError, setSubmitting }) => {
        authServices
            .login(values)
            .then(res => {
                setCookie("token", res.data.token, res.data.expireHours);
                _dispatch(
                    setLogin({ user: res.data.user, token: res.data.token })
                );

                localStorage.setItem(
                    "social-app-user",
                    JSON.stringify(res.data.user)
                );
                toast.success(
                    `Welecome ${res.data.user.firstname} ${res.data.user.lastname}`
                );
                setTimeout(() => {
                    navigate("/", { replace: true });
                }, 1000);
            })
            .catch(err => {
                const msg = err.response?.data?.message || "Server Error";
                if (msg.includes("email")) setFieldError("email", msg);
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
            <div className="relative bg-white w-3/4 md:w-2/4 xl:w-1/4 shadow-sm rounded-sm p-4 mx-auto dark:bg-secondry-dark">
                <h2 className="text-center mb-4">Login</h2>
                <FormikContainer
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                >
                    {({ isSubmitting }) => {
                        return (
                            <Form>
                                <FieldContainer
                                    type="text"
                                    label="Email"
                                    name="email"
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
                                        "Login"
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

export default Login;
