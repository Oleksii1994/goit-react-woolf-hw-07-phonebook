import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import * as handlersForContactsSlice from './handlers/handlersForContactsSlice';
import { fetchContacts, postContact, deleteContact } from './operations';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    contactsArr: [],
    isLoading: false,
    error: null,
  },

  extraReducers: builder => {
    builder
      // .addCase(fetchContacts.pending, handlersForContactsSlice.handlePending)
      // .addCase(postContact.pending, handlersForContactsSlice.handlePending)
      // .addCase(deleteContact.pending, handlersForContactsSlice.handlePending)
      // .addCase(fetchContacts.rejected, handlersForContactsSlice.handleRejected)
      // .addCase(postContact.rejected, handlersForContactsSlice.handleRejected)
      // .addCase(deleteContact.rejected, handlersForContactsSlice.handleRejected)
      .addCase(
        fetchContacts.fulfilled,
        handlersForContactsSlice.handlerFetchContactsFulfilled
      )
      .addCase(
        postContact.fulfilled,
        handlersForContactsSlice.handlerPostContactFulfilled
      )
      .addCase(
        deleteContact.fulfilled,
        handlersForContactsSlice.handlerDeleteContactFulfilled
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          postContact.pending,
          deleteContact.pending
        ),
        handlersForContactsSlice.handlePending
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          postContact.rejected,
          deleteContact.rejected
        ),
        handlersForContactsSlice.handleRejected
      );
  },
});

export const { fetchingInProgress, fetchingSuccess, fetchingError } =
  contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
