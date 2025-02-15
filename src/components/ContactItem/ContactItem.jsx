import { ContactItemLi, DeleteBtn } from './ContactItem.styled';
import { deleteContact } from 'redux/operations';
import { useDispatch } from 'react-redux';
import Notiflix from 'notiflix';

export const ContactItem = ({ id, name, phone }) => {
  const dispatch = useDispatch();

  const handleDelete = ({ id, name }) => {
    dispatch(deleteContact(id))
      .unwrap()
      .then(() => {
        Notiflix.Notify.success(`Contact ${name} deleted successfully`);
      })
      .catch(() => {
        Notiflix.Notify.error(`Oops, something went wrong`);
      });
  };

  return (
    <ContactItemLi>
      {name}: {phone}
      <DeleteBtn type="button" onClick={() => handleDelete({ id, name })}>
        Delete
      </DeleteBtn>
    </ContactItemLi>
  );
};
