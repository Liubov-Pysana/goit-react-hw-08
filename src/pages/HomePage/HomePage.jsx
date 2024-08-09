import { useSelector } from "react-redux";
import css from "./HomePage.module.css";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import PageLoggedUser from "../../components/PageLoggedUser/PageLoggedUser";

export default function HomePage() {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    return isLoggedIn ? (
        <PageLoggedUser />
    ) : (
        <div>
            <h1 className={css.title}>Hello user!</h1>
            <p className={css.text}>Here we're storing your contacts. Log in or register please.</p>
        </div>
    );
}
