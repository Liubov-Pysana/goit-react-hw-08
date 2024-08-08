import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";
import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/slice";

export default function ContactList() {
    const visibleContacts = useSelector(selectFilteredContacts);

    return (
        <ul className={css.list}>
            {visibleContacts.map((contact) => (
                <li className={css.item} key={contact.id}>
                    <Contact data={contact} />
                </li>
            ))}
        </ul>
    );
}
