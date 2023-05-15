import { createSlice } from '@reduxjs/toolkit';
import { fetchContacts, postContact, deleteContact } from './operations';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contactsArr: [],
    isLoading: false,
    error: null,
  },
  // reducers: {
  //   addContact: {
  //     reducer(state, action) {
  //       state.contactsArr.push(action.payload);
  //     },
  //     prepare({ name, phone }) {
  //       return {
  //         payload: {
  //           name,
  //           phone,
  //           id: nanoid(),
  //         },
  //       };
  //     },
  //   },
  //   deleteContactAction: (state, action) => {
  //     const index = state.contactsArr.findIndex(
  //       contact => contact.id === action.payload
  //     );
  //     state.contactsArr.splice(index, 1);
  //   },
  // },

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

    [postContact.pending](state) {
      state.isLoading = true;
    },
    [postContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.contactsArr.push(action.payload);
    },
    [postContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [deleteContact.pending](state) {
      state.isLoading = true;
    },
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.contactsArr.findIndex(
        contact => contact.id === action.payload.id
      );
      state.contactsArr.splice(index, 1);
    },
    [deleteContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

// export const { addContact, deleteContactAction } = contactsSlice.actions;
export const { fetchingInProgress, fetchingSuccess, fetchingError } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
