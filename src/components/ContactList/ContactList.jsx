import React from "react";
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ contacts, onDeliteContact }) => {
    return (
    <div className={css.contactList}>
            <ul>
                {contacts.map(({ id, name, number }) => (
                    <li key={id} className={css.contactList__item}>
                        <p className={css.contactList__text}>{name}:  {number}</p>
                        <button onClick={() => onDeliteContact(id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
    
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.exact({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            number: PropTypes.string.isRequired,
        })
    )
    
}
    
export default ContactList;