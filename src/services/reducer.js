import { combineReducers } from 'redux';
import { burgerApi } from './burgerApi';
import { modalSlice } from './modal-slice';
import { burgerContructorSlice } from './burger-constructor-slice';

export const reducer = combineReducers({
    [burgerApi.reducerPath]: burgerApi.reducer,
    [modalSlice.reducerPath]: modalSlice.reducer,
    [burgerContructorSlice.reducerPath]: burgerContructorSlice.reducer,
  });