import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getUser as getUserApi, register as registerApi, login as loginApi, logout as logoutApi, changeUserInfo as changeUserInfoApi,
    forgotPassword as forgotPasswordApi, resetPassword as resetPasswordApi
 } from '../api';

export const register = createAsyncThunk(
    'user/register',
    async (registerInfo) => {
      const response = await registerApi(registerInfo);
      return response.user;
    },
)
export const login = createAsyncThunk(
    'user/login',
    async (loginInfo) => {
      const response = await loginApi(loginInfo);
      return response.user;
    },
)
export const logout = createAsyncThunk('user/logout', logoutApi)
export const getUser = createAsyncThunk(
	'user/getUser',
	async () => {
		if (localStorage.getItem('accessToken')) {
			const response = await getUserApi();
			return response.user;
		} else {
			return null;
		}
	}
);
export const changeUserInfo = createAsyncThunk(
	'user/changeUserInfo',
	async (userInfo) => {
		const response = await changeUserInfoApi(userInfo);
		return response.user;
	}
);
export const forgotPassword = createAsyncThunk('user/forgotPassword', forgotPasswordApi);
export const resetPassword = createAsyncThunk('user/resetPassword', resetPasswordApi);