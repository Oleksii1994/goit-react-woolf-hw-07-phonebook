import { ContactItemLi, DeleteBtn } from './ContactItem.styled';
// import { deleteContactAction } from 'redux/contactsSlice';
import { deleteContact } from 'redux/operations';
import { useSelector, useDispatch } from 'react-redux';
import { selectContactsArr, selectFilter } from 'redux/selectors';
import Notiflix from 'notiflix';

export const ContactItem = () => {
  const dispatch = useDispatch();

  const contactsState = useSelector(selectContactsArr);
  const filterState = useSelector(selectFilter);

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

  return getVisibleContacts().map(({ id, name, phone }) => {
    return (
      <ContactItemLi key={id}>
        {name}: {phone}
        <DeleteBtn type="button" onClick={() => handleDelete(id, name)}>
          Delete
        </DeleteBtn>
      </ContactItemLi>
    );
  });
};
