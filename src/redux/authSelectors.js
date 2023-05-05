const selectUser = (state) => state.auth.user;

const selectUID = (state) => state.auth.uid;

// const selectStateChanged = (state) => state.auth.stateChange;

export { selectUser, selectUID};