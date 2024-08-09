import css from "./PageLoggedUser.module.css";
import { Link } from "react-router-dom";

export default function PageLoggedUser() {
    return (
        <div className={css.container}>
            <p className={css.text}>
                You are on the main page. To view your contact list, click{" "}
                <Link className={css.link} to="/contacts">
                    Contacts
                </Link>
                .
            </p>
            <Link className={css.link} to="/contacts"></Link>
        </div>
    );
}
