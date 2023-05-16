import { nanoid } from 'nanoid';
import React, { Component } from "react";
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';

class App extends Component {
  state = {
    contacts: [
    {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
  ],
    filter: '',
  }

  addContact = ({ text, phone }) => {
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

    // console.log(`contactsAdd`, this.state);


    // for (let i = 0; i < this.state.contacts.length; i =+ 1) {
    //   console.log(`for i=`, i);
    //   console.log(`this.state.contacts[i].name.toLowerCase()`, this.state.contacts[i].name.toLowerCase());

    //   if (this.state.contacts[i].name.toLowerCase() === textName) {
    //     alert(`${text} is already in contacts.`);
    //     return;
    //   }
    // }  
  //       // console.log(`contact2`, contact);

  //       this.setState(prevState => ({
  //         contacts: [contact, ...prevState.contacts],
  //       }));
  //       // console.log(`contactsAdd`, this.state);
  //   return;
   }

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
    // console.log(`filter`, this.state.filter);
  }

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  }

  getConstVisibleContacts = () => {
    const { filter, contacts } = this.state;
    if (filter.trim() === '') {
      return contacts;
    } else {
      return this.getVisibleContacts();
    };
  }

  deliteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }))    
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    // console.log(`parsedContacts`, parsedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
      // console.log(`contacts`, this.state);
    }
  }

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
  
  render() {
    const { filter } = this.state;  
    const visibleContacts = this.getConstVisibleContacts();
    return (
      <div className={css.app}>
        <h1>Phonebook</h1>

        <ContactForm onSubmitEditor={this.addContact} />

        <h2>Contacts</h2>

        <Filter value={filter} changeFilter={this.changeFilter} />

        {/* <ContactList contacts={this.state.contacts} onDeliteContact={this.deliteContact}/> */}
        <ContactList contacts={visibleContacts} onDeliteContact={this.deliteContact}/>

      </div>
    );
  }
  
};

export default App;