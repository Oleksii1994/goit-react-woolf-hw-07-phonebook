import { ContactItemLi, DeleteBtn } from './ContactItem.styled';
import { deleteContact } from 'redux/contactsSlice';
import { useSelector, useDispatch } from 'react-redux';
import Notiflix from 'notiflix';

export const ContactItem = () => {
  const dispatch = useDispatch();

  const contactsState = useSelector(state => state.contacts.contactsArr);
  const filterState = useSelector(state => state.filter);

  function getVisibleContacts() {
    const normalizedFilter = filterState.toLowerCase();
    return contactsState.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  }

  const handleDelete = (id, name) => {
    dispatch(deleteContact(id));
    Notiflix.Notify.success(`Contact ${name} deleted successfully`);
  };

  return getVisibleContacts().map(({ id, name, number }) => {
    return (
      <ContactItemLi key={id}>
        {name}: {number}
        <DeleteBtn type="button" onClick={() => handleDelete(id, name)}>
          Delete
        </DeleteBtn>
      </ContactItemLi>
    );
  });
};
