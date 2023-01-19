import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    currentUser: {
      _id: null,
      name: '',
    }
  },
  reducers: {
    addCurrentUser(state, action) {
      state.currentUser._id = action.payload.id

    },
  }
})
export const {addCurrentUser} = currentUserSlice.actions;

export default currentUserSlice.reducer;