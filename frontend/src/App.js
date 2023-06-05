import { Route, Routes, useNavigate } from "react-router-dom";
import { Suspense, useEffect, useRef } from "react";
import { routes } from "./utils/routes";
import { ToastContainer } from "react-toastify";
import "./index.css";
import Navbar from "./components/Navbar";
import Loading from "./components/Loading";
import { getCookie, setCookie } from "./utils/cookies";
import "react-toastify/dist/ReactToastify.css";
import { setLogin, setLogout, setMode } from "./redux/slicers";
import { useDispatch, useSelector } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import E404 from "./pages/404";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/sign-up";
import { QueryClient, QueryClientProvider } from "react-query";
import ProtectedRoutes from "./components/ProtectedRoutes";
import authServices from "./services/auth";

const queryClient = new QueryClient();
function App() {
    const navigate = useNavigate();
    const _dispatch = useDispatch();
    const { mode } = useSelector(state => state.auth);
    const intervalRef = useRef();

    const refreshToken = () => {
        authServices
            .verifyToken()
            .then(res => {})
            .catch(err => {
                if (err.response.status === 401) {
                    _dispatch(setLogout());
                    setCookie("token", "", -1);
                    navigate("/login", { replace: true });
                }
            });
    };
    useEffect(() => {
        const cookie = getCookie("token");

        const user = JSON.parse(localStorage.getItem("social-app-user"));
        const mode = localStorage.getItem("social-app-theme");
        document.documentElement.classList.add(mode);
        if (!cookie) {
            navigate("/login", { replace: true });
        } else {
            refreshToken();
            intervalRef.current = setInterval(refreshToken, 1000 * 60 * 30);
            if (user) {
                _dispatch(setLogin({ user: user, token: cookie }));
                _dispatch(setMode(mode === undefined ? "light" : mode));
            }
        }
        return () => clearInterval(intervalRef.current);
    }, []);
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider theme={mode}>
                <div className="transition-all dark:text-d-primary-font text-secondry">
                    <ToastContainer
                        theme={mode}
                        autoClose={3000}
                        toastStyle={{
                            backgroundColor:
                                mode === "dark"
                                    ? "var( --d-secondry-color)"
                                    : "white",
                        }}
                    />
                    <Navbar />
                    <Routes>
                        <Route element={<ProtectedRoutes />}>
                            {routes.map(r => (
                                <Route
                                    key={r.id}
                                    {...r}
                                    element={
                                        <Suspense fallback={<Loading />}>
                                            {r.element}
                                        </Suspense>
                                    }
                                />
                            ))}
                        </Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="*" element={<E404 />} />
                    </Routes>
                </div>
            </ChakraProvider>
        </QueryClientProvider>
    );
}

export default App;
