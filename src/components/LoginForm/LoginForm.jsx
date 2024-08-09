import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { selectError, selectIsLoading } from "../../redux/auth/selectors";
import css from "./LoginForm.module.css";

export default function LoginForm() {
    const dispatch = useDispatch();
    const error = useSelector(selectError);
    const isLoading = useSelector(selectIsLoading);

    const handleSubmit = (values, actions) => {
        dispatch(logIn(values));
        actions.setSubmitting(false); // Stop form submission process
    };

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            onSubmit={handleSubmit}
        >
            {({ isSubmitting }) => (
                <Form className={css.form} autoComplete="off">
                    <div className={css.field}>
                        <label>
                            Email
                            <Field className={css.input} type="email" name="email" />
                        </label>
                        <ErrorMessage name="email" component="div" className={css.error} />
                    </div>
                    <div className={css.field}>
                        <label>
                            Password
                            <Field className={css.input} type="password" name="password" />
                        </label>
                        <ErrorMessage name="password" component="div" className={css.error} />
                    </div>
                    {error && <div className={css.error}>{error}</div>} {/* Display error message */}
                    <button className={css.button} type="submit" disabled={isSubmitting || isLoading}>
                        {isLoading ? "Logging in..." : "Log In"}
                    </button>
                </Form>
            )}
        </Formik>
    );
}
