import { createSlice, nanoid } from '@reduxjs/toolkit';
import { fetchContacts } from './operations';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contactsArr: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    addContact: {
      reducer(state, action) {
        state.contactsArr.push(action.payload);
      },
      prepare({ name, phone }) {
        return {
          payload: {
            name,
            phone,
            id: nanoid(),
          },
        };
      },
    },
    deleteContact: (state, action) => {
      const index = state.contactsArr.findIndex(
        contact => contact.id === action.payload
      );
      state.contactsArr.splice(index, 1);
    },
  },

  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.contactsArr = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const { fetchingInProgress, fetchingSuccess, fetchingError } =
  contactsSlice.actions;
// export const tasksReducer = contactsSlice.reducer;
export const contactsReducer = contactsSlice.reducer;
