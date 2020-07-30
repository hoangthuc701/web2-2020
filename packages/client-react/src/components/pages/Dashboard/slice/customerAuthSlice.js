import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  token: null,
  user: null,
  loading: false,
  role: 'customer',
  ready: false,
};

export const customerAuthSlice = createSlice({
  name: 'lading',
  initialState,
  reducers: {
    setStatus: (state, { payload: status }) => ({
      ...state,
      user: {
        ...state.user,
        status,
      },
    }),
    setLoading: (state, { payload: loading }) => ({
      ...state,
      loading,
    }),
    setAuth: (state, { payload: { token, user } }) => ({
      ...state,
      token,
      user: {
        ...user,
      },
    }),
    clearAuth: () => ({
      ...initialState,
      ready: true,
    }),
    setReady: state => ({
      ...state,
      ready: true,
    }),
  },
});

export const {
  setAuth,
  setReady,
  clearAuth,
  setLoading,
  setStatus,
} = customerAuthSlice.actions;

export const signIn = (loginData, resolve, reject) => async dispatch => {
  const url = '/auth/login';
  try {
    dispatch(setLoading(true));
    const res = await axios.post(url, loginData);
    dispatch(setAuth({ ...res.data }));
    sessionStorage.setItem('customerAuth', JSON.stringify({ ...res.data }));
    resolve();
  } catch (error) {
    reject(error);
  } finally {
    dispatch(setLoading(false));
  }
};

export const uploadPID = (
  { fileData, token },
  resolve,
  reject
) => async dispatch => {
  const url = 'https://piggy-bank-api.herokuapp.com/api/auth/updateIndentity';
  try {
    dispatch(setLoading(true));
    const res = await axios.post(url, fileData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    dispatch(setStatus('WAITING'));
    resolve(res);
  } catch ({ response }) {
    reject(response);
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchSessionStorage = () => dispatch => {
  try {
    const customerAuth = JSON.parse(sessionStorage.getItem('customerAuth'));
    if (customerAuth) dispatch(setAuth(customerAuth));
  } catch (error) {
    //
  } finally {
    dispatch(setReady());
  }
};

export const signOut = () => dispatch => {
  sessionStorage.setItem('customerAuth', '');
  dispatch(clearAuth());
};

export const customerSelector = state => state.customerAuth.user;

export default customerAuthSlice.reducer;
