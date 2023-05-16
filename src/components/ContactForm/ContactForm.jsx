import React, { Component } from "react";
import css from './ContactForm.module.css';

class ContactForm extends Component {
    state = {
        text: '',
        phone: ''
    };

    handleChange = event => {
        this.setState({ text: event.currentTarget.value });
    };

    handleChangeNumber = event => {
        this.setState({ phone: event.currentTarget.value });
    };

    reset = () => {
        this.setState({ text: '', phone: '' });    
    }

    handleSubmit = event => {
        event.preventDefault();
        // console.log(`this.state`, this.state);
        this.props.onSubmitEditor(this.state);
        this.reset();
    }

    render() {
        return (
            <div className={css.contactEditor}>
                <form className={css.contactEditor__form} onSubmit={this.handleSubmit}>
                    <label className={css.contactEditor__label} htmlFor="">
                        <p className={css.contactEditor__name}>Name</p>
                        <input
                            type="text"
                            value={this.state.text}
                            onChange={this.handleChange}
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            required
                        /> 
                    </label>
                    <label className={css.contactEditor__label} htmlFor="">
                        <p className={css.contactEditor__name}>Number</p>
                        <input
                            type="tel"
                            value={this.state.phone}
                            onChange={this.handleChangeNumber}
                            name="number"
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                            required
                        />
                    </label>
                    <button type="submit">Add contact</button>
                </form>
            </div>
        );
    }

}

export default ContactForm;
