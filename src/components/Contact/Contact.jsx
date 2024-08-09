import { FaUser } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import Modal from "react-modal";
import css from "./Contact.module.css";
import { useDispatch } from "react-redux";
import { deleteContact, updateContact } from "../../redux/contacts/operations";
import { useState } from "react";

Modal.setAppElement("#root");

export default function Contact({ data }) {
    const dispatch = useDispatch();
    const { id, name, number } = data;

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedName, setEditedName] = useState(name);
    const [editedNumber, setEditedNumber] = useState(number);

    const handleDelete = () => {
        dispatch(deleteContact(id));
        setModalIsOpen(false);
    };

    const openDeleteModal = () => {
        setModalIsOpen(true);
    };

    const closeDeleteModal = () => {
        setModalIsOpen(false);
    };

    const handleEdit = () => {
        dispatch(updateContact({ id, name: editedName, number: editedNumber }));
        setIsEditing(false);
    };

    return (
        <div className={css.container}>
            <div>
                <p className={css.text}>
                    Name:
                    {} {name}
                </p>
                <p className={css.password}>
                    Number:
                    {} {number}
                </p>
            </div>
            <button className={css.button} onClick={() => setIsEditing(true)}>
                Edit
            </button>
            <button className={css.button} onClick={openDeleteModal}>
                Delete
            </button>

            {isEditing && (
                <Modal
                    isOpen={isEditing}
                    onRequestClose={() => setIsEditing(false)}
                    className={css.modal}
                    overlayClassName={css.overlay}
                >
                    <h2 className={css.title}>Edit Contact</h2>
                    <div className={css.edit}>
                        <label>
                            Name:
                            <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
                        </label>
                    </div>
                    <div className={css.edit}>
                        <label>
                            Number:
                            <input type="text" value={editedNumber} onChange={(e) => setEditedNumber(e.target.value)} />
                        </label>
                    </div>

                    <button className={css.button} onClick={handleEdit}>
                        Save
                    </button>
                    <button className={css.button} onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                </Modal>
            )}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeDeleteModal}
                className={css.modal}
                overlayClassName={css.overlay}
            >
                <div className={css.window}>
                    <p>Are you sure you want to delete this contact?</p>
                    <div className={css.btn}>
                        <button className={css.button} onClick={handleDelete}>
                            Yes
                        </button>
                        <button className={css.button} onClick={closeDeleteModal}>
                            No
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
