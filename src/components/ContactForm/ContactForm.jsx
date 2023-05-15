import { useState } from 'react';
import Notiflix from 'notiflix';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactsSlice';
import { Form, Label, Input, SubmitButton } from './ContactForm.styled';

export function ContactForm() {
  const dispatch = useDispatch();
  const stateContacts = useSelector(state => state.contacts.contactsArr);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  function handleInputChange(e) {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;

    for (const contact of stateContacts) {
      if (
        contact.name.toLowerCase() === form.elements.name.value.toLowerCase()
      ) {
        Notiflix.Notify.failure(`${[name]} is already in contact`);
        return;
      } else if (contact.number === form.elements.number.value) {
        return Notiflix.Notify.failure(
          `${form.elements.number.value} is already in contact`
        );
      }
    }

    dispatch(
      addContact({
        name: form.elements.name.value,
        number: form.elements.number.value,
      })
    );
    Notiflix.Notify.success('Contact added');
    form.reset();

    reset();
  }

  function reset() {
    setName('');
    setNumber('');
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Label>
        Name
        <Input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Enter name"
          onChange={handleInputChange}
          value={name}
        />
      </Label>
      <Label>
        Number
        <Input
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Enter phone number"
          onChange={handleInputChange}
          value={number}
        />
      </Label>

      <SubmitButton type="submit">Add contact</SubmitButton>
    </Form>
  );
}
