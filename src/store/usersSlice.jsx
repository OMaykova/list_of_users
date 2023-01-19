import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {usersApi} from '../utils/usersApi';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async function(_, { rejectWithValue }) {
    try {
      const response = await usersApi.getUsers();
      // if(!response.ok) {
      //   throw new Error('Сервер не отвечает!');
      // }  использовать, если используется url вместо API
      const data = await response;
      return data.data;
    } catch(error) {
        return rejectWithValue(error.message);
    }
  }
);

export const setLikeUser = createAsyncThunk(
  'users/setLikeUser',
  async function(user, { rejectWithValue, getState, dispatch}) {
    const currentUserId = getState().currentUser.currentUser._id;
    const isLiked = user.like === currentUserId;

    try {
      const response = isLiked ?
      await usersApi.removeLike(user)
      : await usersApi.setLike(currentUserId, user)
      const data = await response;
      return data
    } catch(error) {
        return rejectWithValue(error.message);
    }
  }
)
const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: null,
    error: null,
  },
  reducers: {
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = 'loading';
      state.error = null // на случай, если до этого была ошибка
    },
    [setLikeUser.pending]: (state) => {
      state.status = 'loading';
      state.error = null // на случай, если до этого была ошибка
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = 'resolved';
      state.users = action.payload;
    },
    [setLikeUser.fulfilled]: (state, action) => {
      state.status = 'resolved';
      const {id, like} = action.payload;
      state.users = state.users.map((u) => {
        if (u.id === id) {
         return {...u, like: like}
        }
        return u
        })
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  }
})
export const {addUser, updateUser} = usersSlice.actions;

export default usersSlice.reducer;