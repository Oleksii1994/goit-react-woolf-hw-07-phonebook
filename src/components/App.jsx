import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectContactsArr,
  selectIsLoading,
  selectError,
} from 'redux/selectors';
import { fetchContacts } from 'redux/operations';

export function App() {
  const dispatch = useDispatch();

  const contactsArr = useSelector(selectContactsArr);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>PhoneBook</h1>
      <ContactForm />

      <div>
        {contactsArr.length > 0 && (
          <>
            <div>
              <h2>Contacts</h2>
              <Filter />
            </div>
            <ContactsList />
          </>
        )}
        {contactsArr.length === 0 && !isLoading && (
          <p>Add your first contact</p>
        )}
        {isLoading && !error && <b>Loading...</b>}
        {error && <p>Oops, something went wrong</p>}
      </div>
    </div>
  );
}
