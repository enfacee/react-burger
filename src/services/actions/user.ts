import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUser as getUserApi, register as registerApi, login as loginApi, logout as logoutApi, changeUserInfo as changeUserInfoApi,
    forgotPassword as forgotPasswordApi, resetPassword as resetPasswordApi
 } from '../api';
import { TUser } from '../../types/ingredient';
import { TLoginRequest, TRegisterRequest } from '../../types/request';


export const register = createAsyncThunk<TUser, TRegisterRequest>(
    'user/register',
    async (registerInfo) => {
      const response = await registerApi(registerInfo);
      return response.user;
    },
)
export const login = createAsyncThunk<TUser, TLoginRequest>(
    'user/login',
    async (loginInfo) => {
      const response = await loginApi(loginInfo);
      return response.user;
    },
)
export const logout = createAsyncThunk('user/logout', logoutApi)
export const getUser = createAsyncThunk<TUser | null>(
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
export const changeUserInfo = createAsyncThunk<TUser, TRegisterRequest>(
	'user/changeUserInfo',
	async (userInfo) => {
		const response = await changeUserInfoApi(userInfo);
		return response.user;
	}
);
export const forgotPassword = createAsyncThunk('user/forgotPassword', forgotPasswordApi);
export const resetPassword = createAsyncThunk('user/resetPassword', resetPasswordApi);