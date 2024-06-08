import { createSlice } from '@reduxjs/toolkit'
import { changeUserInfo, forgotPassword, getUser, login, logout, register, resetPassword } from '../actions/user';

const initialState = {
    user: null,
    isUserAuth: false,
    passwordChanged: false,
    tokenSent: false
  }
  export const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
      builder
        .addCase(getUser.pending, (state) => {
            state.user = null;
            state.isUserAuth = false;
        })
        .addCase(getUser.rejected, (state) => {
            state.user = null;
            state.isUserAuth = true;
        })
        .addCase(getUser.fulfilled, (state, {payload}) => {
            state.isUserAuth = true;      
            state.user = payload;
        })
        .addCase(register.fulfilled, (state, {payload}) => {
            state.user = payload;
        })
        .addCase(login.fulfilled, (state, {payload}) => {
            state.user = payload;
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null;
        })
        .addCase(changeUserInfo.fulfilled, (state, {payload}) => {
            state.user = payload;
        })
        .addCase(forgotPassword.fulfilled, (state) => {
            state.tokenSent = true;
            state.passwordChanged = false;
        })
        .addCase(resetPassword.fulfilled, (state) => {
            state.passwordChanged = true;
        });
    }
  })
  export const { addFormInfo, resetUserInfo, resetToken } = userSlice.actions;