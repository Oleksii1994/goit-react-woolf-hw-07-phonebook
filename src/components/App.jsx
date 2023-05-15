import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getContacts } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';

export function App() {
  const dispatch = useDispatch();
  // const stateContacts = useSelector(state => state.contacts.contactsArr);

  // Отримуємо частини стану
  const { contactsArr, isLoading, error } = useSelector(getContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>PhoneBook</h1>
      <ContactForm />

      <div>
        {isLoading && <p>Loading contacts...</p>}
        {error && <p>Oops, something went wrong</p>}
        {contactsArr.length > 0 && (
          <div>
            <h2>Contacts</h2>
            <Filter />
          </div>
        )}
        {contactsArr.length > 0 && <ContactsList />}
      </div>
    </div>
  );
}
