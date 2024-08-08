import { Formik, Form, Field } from "formik";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";
import css from "./RegistrationForm.module.css";

export default function RegistrationForm() {
    const dispatch = useDispatch();
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
                </div>
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
                    Register
                </button>
            </Form>
        </Formik>
    );
}
