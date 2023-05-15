import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useSelector } from 'react-redux';

export function App() {
  const stateContacts = useSelector(state => state.contacts.contactsArr);

  return (
    <div className="container">
      <h1>PhoneBook</h1>
      <ContactForm />

      <div>
        {stateContacts.length > 0 && (
          <div>
            <h2>Contacts</h2>
            <Filter />
          </div>
        )}
        {stateContacts.length > 0 && <ContactsList />}
      </div>
    </div>
  );
}
