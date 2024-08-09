import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/operations";
import { selectError, selectIsLoading } from "../../redux/auth/selectors"; // Optional if using error handling
import css from "./RegistrationForm.module.css";

export default function RegistrationForm() {
    const dispatch = useDispatch();
    const error = useSelector(selectError); // Optional if using error handling
    const isLoading = useSelector(selectIsLoading); // Optional if using loading state

    const handleSubmit = (values, actions) => {
        dispatch(register(values));
        actions.resetForm();
    };

    return (
        <Formik
            initialValues={{
                name: "",
                email: "",
                password: "",
            }}
            onSubmit={handleSubmit}
        >
            <Form className={css.form}>
                <div className={css.field}>
                    <label>
                        Username
                        <Field className={css.input} type="text" name="name" />
                    </label>
                    <ErrorMessage name="name" component="div" className={css.error} /> {/* Optional */}
                </div>
                <div className={css.field}>
                    <label>
                        Email
                        <Field className={css.input} type="email" name="email" />
                    </label>
                    <ErrorMessage name="email" component="div" className={css.error} /> {/* Optional */}
                </div>
                <div className={css.field}>
                    <label>
                        Password
                        <Field className={css.input} type="password" name="password" />
                    </label>
                    <ErrorMessage name="password" component="div" className={css.error} /> {/* Optional */}
                </div>
                {error && <div className={css.error}>{error}</div>} {/* Optional: Display error message */}
                <button className={css.button} type="submit" disabled={isLoading}>
                    {isLoading ? "Registering..." : "Register"}
                </button>
            </Form>
        </Formik>
    );
}
