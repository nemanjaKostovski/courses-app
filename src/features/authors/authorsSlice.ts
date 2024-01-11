import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchAuthors, saveNewAuthor } from '../../services';

type Author = {
  id: string;
  name: string;
};

type initialState = {
  loading: boolean;
  authors: Author[];
  error: string;
};

const initialState: initialState = {
  loading: false,
  authors: [],
  error: '',
};

const authorsSlice = createSlice({
  name: 'authors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuthors.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchAuthors.fulfilled,
      (state, action: PayloadAction<Author[]>) => {
        state.loading = false;
        state.authors = action.payload;
        state.error = '';
      }
    );
    builder.addCase(fetchAuthors.rejected, (state, action) => {
      state.loading = false;
      state.authors = [];
      state.error = action.error.message || 'Something went wrong';
    });
    builder.addCase(
      saveNewAuthor.fulfilled,
      (state, action: PayloadAction<Author>) => {
        state.authors.push(action.payload);
        state.loading = false;
        state.error = '';
      }
    );
  },
});

export default authorsSlice.reducer;
