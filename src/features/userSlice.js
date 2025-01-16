import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { instance } from '../instance';

export const createUser = createAsyncThunk(
  'user/createUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance.post('/user/signup', data);
      console.log(response);
      localStorage.setItem('token', response.data.token);
      return response.data.data.newUser;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  'user/loginUser',
  async (data, { rejectWithValue }) => {
    try {
      const response = await instance.post('/user/login', data);
      console.log(response);
      localStorage.setItem('token', response.data.token);
      return response?.data?.data.newUser;
    } catch (error) {
      console.log('error', error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: { data: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    {
      builder
        .addCase(createUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(createUser.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(createUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });

      builder
        .addCase(login.pending, (state) => {
          state.loading = true;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(login.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    }
  },
});

export default userSlice.reducer;
