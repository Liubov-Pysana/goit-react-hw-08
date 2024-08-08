import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addContacts } from "../../redux/contacts/operations";

const UserSchema = Yup.object().shape({
    name: Yup.string().min(3, "Minimum 3 letters").max(50, "Maximum 30 letters").required("This field is required"),
    number: Yup.string().min(3, "Minimum 3 numbers").max(50, "Maximum 50 numbers").required("This field is required"),
});

export default function ContactForm() {
    const dispatch = useDispatch();

    const handleSubmit = (values, actions) => {
        console.log("Form Values:", values);
        dispatch(addContacts(values));
        actions.resetForm();
    };

    return (
        <Formik
            initialValues={{
                name: "",
                number: "",
            }}
            validationSchema={UserSchema}
            onSubmit={handleSubmit}
        >
            <Form className={css.form}>
                <div className={css.field}>
                    <label>Name</label>
                    <Field className={css.input} type="text" name="name" />
                    <ErrorMessage className={css.error} name="name" component="span" />
                </div>
                <div className={css.field}>
                    <label>Number</label>
                    <Field className={css.input} type="text" name="number" />
                    <ErrorMessage className={css.error} name="number" component="span" />
                </div>
                <button className={css.button} type="submit">
                    Add contact
                </button>
            </Form>
        </Formik>
    );
}
