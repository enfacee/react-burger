import { createSlice } from '@reduxjs/toolkit'
import { changeUserInfo, forgotPassword, getUser, login, logout, register, resetPassword } from '../actions/user';

const initialState = {
    user: null,
    isUserAuth: false,
    passwordChanged: false,
    tokenSent: false,
    form: {
        email: '',
        password: '',
        token: '',
        name: ''
      }
  }
  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addFormInfo: (state, action) => {
            state.form ={...state.form,
                [action.payload.key]: action.payload.value
            }
        },
        resetUserInfo: (state) => {
            state.form.email = state.user.email;
            state.form.name = state.user.name;
            state.form.password = '';            
        }
    },
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
            state.form = {...state.form, ...payload};
        })
        .addCase(register.fulfilled, (state, {payload}) => {
            state.user = payload;
            state.form = {...state.form, ...payload, password:''};
        })
        .addCase(login.fulfilled, (state, {payload}) => {
            state.user = payload;
            state.form = {...state.form, ...payload, password:''};
        })
        .addCase(logout.fulfilled, (state) => {
            state.user = null;
        })
        .addCase(changeUserInfo.fulfilled, (state, {payload}) => {
            state.user = payload;
            state.form = {...state.form, ...payload, password:''};
        })
        .addCase(forgotPassword.fulfilled, (state) => {
            state.tokenSent = true;
            state.passwordChanged = false;
        })
        .addCase(resetPassword.fulfilled, (state) => {
            state.passwordChanged = true;
            state.form = {...state.form, password:'', token:''};
        });
    }
  })
  export const { addFormInfo, resetUserInfo, resetToken } = userSlice.actions;