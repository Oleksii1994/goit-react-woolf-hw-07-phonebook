export const handlePending = state => {
  state.isLoading = true;
};

export const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

export const handlerFetchContactsFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.contactsArr = payload;
};

export const handlerPostContactFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  state.contactsArr.push(payload);
};

export const handlerDeleteContactFulfilled = (state, { payload }) => {
  state.isLoading = false;
  state.error = null;
  const index = state.contactsArr.findIndex(
    contact => contact.id === payload.id
  );
  state.contactsArr.splice(index, 1);
};
