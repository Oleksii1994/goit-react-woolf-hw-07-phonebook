import { createSelector } from '@reduxjs/toolkit';

export const selectContacts = state => state.contacts;
export const selectContactsArr = state => state.contacts.contactsArr;
export const selectIsLoading = state => state.contacts.isLoading;
export const selectError = state => state.contacts.error;
export const selectFilter = state => state.filter;

export const selectVisibleContacts = createSelector(
  [selectContacts, selectFilter],
  (contacts, filter) => {
    return contacts.contactsArr.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
  }
);
