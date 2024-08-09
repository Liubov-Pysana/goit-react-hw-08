import { lazy, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "../../redux/auth/operations";
import { selectIsRefreshing } from "../../redux/auth/selectors";
import RestrictedRoute from "../RestrictedRoute/RestrictedRoute";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const RegistrationPage = lazy(() => import("../../pages/RegistrationPage/RegistrationPage"));
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const ContactsPage = lazy(() => import("../../pages/ContactsPage/ContactsPage"));

export default function App() {
    const dispatch = useDispatch();
    const isRefreshing = useSelector(selectIsRefreshing);

    useEffect(() => {
        dispatch(refreshUser());
    }, [dispatch]);

    return isRefreshing ? (
        <div>Refreshing user...</div>
    ) : (
        <Layout>
            <Suspense>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route
                        path="/register"
                        element={<RestrictedRoute component={<RegistrationPage />} redirectTo="/contacts" />}
                    />
                    <Route
                        path="/login"
                        element={<RestrictedRoute component={<LoginPage />} redirectTo="/contacts" />}
                    />
                    <Route
                        path="/contacts"
                        element={<PrivateRoute component={<ContactsPage />} redirectTo="/login" />}
                    />
                </Routes>
            </Suspense>
        </Layout>
    );
}
