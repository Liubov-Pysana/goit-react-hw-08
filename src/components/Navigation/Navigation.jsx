import { NavLink } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import { useSelector } from "react-redux";
import { IoHomeSharp } from "react-icons/io5";
import css from "./Navigation.module.css";

export default function Navigation() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return (
        <nav className={css.nav}>
            <NavLink className={css.link} to="/">
                <IoHomeSharp />
            </NavLink>
            {isLoggedIn && (
                <NavLink className={css.link} to="/contacts">
                    Contacts
                </NavLink>
            )}
        </nav>
    );
}
