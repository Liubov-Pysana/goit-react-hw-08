import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";

export default function LoginForm() {
    const dispatch = useDispatch();
    const handleSubmit = (values, actions) => {
        dispatch(logIn(values));
        actions.resetForm();
    };

    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            onSubmit={handleSubmit}
        >
            <Form className={css.form} autoComplete="off">
                <div className={css.field}>
                    <label>
                        Email
                        <Field className={css.input} type="email" name="email" />
                    </label>
                </div>
                <div className={css.field}>
                    <label>
                        Password
                        <Field className={css.input} type="password" name="password" />
                    </label>
                </div>
                <button className={css.button} type="submit">
                    Log In
                </button>
            </Form>
        </Formik>
    );
}
