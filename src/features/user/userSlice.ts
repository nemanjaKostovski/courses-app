import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser, removeUser } from '../../services';

type User = {
  isAuth: boolean;
  name: string;
  email: string;
  token: string;
};

type initialState = {
  loading: boolean;
  user: User;
  error: string;
};

const user_token = localStorage.getItem('user_token');

const initialState: initialState = {
  loading: false,
  user: { isAuth: false, name: '', email: '', token: user_token || '' },
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = { ...action.payload, isAuth: true };
        state.error = '';
      }
    );
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.user = {
        isAuth: false,
        name: '',
        email: '',
        token: user_token || '',
      };
      state.error = action.error.message || 'Something went wrong';
    });
    builder.addCase(removeUser.fulfilled, (state) => {
      state.user = {
        isAuth: false,
        name: '',
        email: '',
        token: '',
      };
    });
  },
});

export default userSlice.reducer;
