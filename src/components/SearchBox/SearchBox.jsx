import css from "./SearchBox.module.css";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { selectTextFilter } from "../../redux/filters/selectors";
import { useId } from "react";

export default function SearchBox() {
    const id = useId();
    const dispatch = useDispatch();
    const textFilter = useSelector(selectTextFilter);

    const handleChange = (event) => {
        dispatch(changeFilter(event.target.value));
    };

    return (
        <form>
            <p>Find contacts by name</p>
            <input className={css.input} type="text" id={id} value={textFilter} onChange={handleChange} />
        </form>
    );
}
