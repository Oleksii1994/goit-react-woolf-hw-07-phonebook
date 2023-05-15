import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { selectContacts } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';

export function App() {
  const dispatch = useDispatch();

  const { contactsArr, isLoading, error } = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>PhoneBook</h1>
      <ContactForm />

      <div>
        {isLoading && !error && <b>Loading...</b>}
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
