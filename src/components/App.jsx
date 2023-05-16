import { nanoid } from 'nanoid';
import React, { useState, useEffect } from "react";
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = ({ text, phone }) => {
    // console.log(`text`, text);
    // console.log(`phone`, phone);

    const cont = {
      id: nanoid(),
      name: text,
      number: phone, 
    };
    // console.log(`contact1`, contact);
    const textName = text.toLowerCase();
    // console.log(`textName`, textName);
    

    const hasName = this.state.contacts.some(
      contact => contact.name.toLowerCase() === textName
    );
    if (hasName) {
      alert(`${text} is already in contacts.`);
      return;
    }

    this.setState(prevState => ({
      contacts: [cont, ...prevState.contacts],
    }));
  }

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
    // console.log(`filter`, filter);
  }

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  }

  const getConstVisibleContacts = () => {
    if (filter.trim() === '') {
      return contacts;
    } else {
      return getVisibleContacts();
    };
  }

  const deliteContact = contactId => {
    setContacts(prevContacts => ({
      prevFilter(contact => contact.id !== contactId),
    }))    
  }

useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    // console.log(`parsedContacts`, parsedContacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
      // console.log(`contacts`, this.state);
    }
}, []);

  componentDidUpdate(prevProps, prevState) {
    // console.log(`componentDidUpdate`);
    if (this.state.contacts !== prevState.contacts) {
      // console.log(`New contacts`);
      // console.log(`this.state`, this.state);
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      // console.log(`localStorage`, localStorage);
    //   const contacts = localStorage.getItem('contacts');
    //   const parsedContacts = JSON.parse(contacts);
    // console.log(`parsedContacts`, parsedContacts);
    }
  }
      
    const visibleContacts = getConstVisibleContacts();
    return (
      <div className={css.app}>
        <h1>Phonebook</h1>

        <ContactForm onSubmitEditor={addContact} />

        <h2>Contacts</h2>

        <Filter value={filter} changeFilter={changeFilter} />

        <ContactList contacts={visibleContacts} onDeliteContact={deliteContact}/>

      </div>
    );
};
