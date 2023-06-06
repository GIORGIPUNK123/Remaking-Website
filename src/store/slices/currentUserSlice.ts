import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserType } from '../../types';
import { axiosInstance } from '../../instance';

export const getCurrentUser = createAsyncThunk(
  'getCurrentUser/get',
  async (accessToken: string) => {
    console.log('accessToken from getCurrUser: ', accessToken);
    return axiosInstance
      .get('/userinfo', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        console.log('setting res.data');
        return res.data;
      })
      .catch((err) => {
        if (err.response.status === 401) {
        }
        console.error('Error from getCurrentUser: ', err.message);
        throw new Error(`Error from getCurrentUser: ${err.message}`);
      });
  }
);

export const registerUser = createAsyncThunk(
  'registerUser/post',
  async (values: {
    name: string;
    surname: string;
    email: string;
    password: string;
  }) => {
    return axiosInstance
      .post('/register', {
        method: 'POST',
        name: values.name,
        surname: values.surname,
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        console.log('Register Response: ', res);
        return res.data;
      })
      .catch((err) => {
        console.log('Error From Register: ', JSON.stringify(err));
      });
  }
);

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState: {
    currentUser: null as null | UserType,
    loading: false,
    error: false,
  },
  reducers: {
    logout: (state) => {
      state.currentUser = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      getCurrentUser.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        state.loading = false;
        state.error = false;
        state.currentUser = action.payload;
      }
    );
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(registerUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.error = false;
    });
  },
});
export const currentUserReducer = currentUserSlice.reducer;
export const logout = currentUserSlice.actions.logout;
