import { combineReducers } from 'redux';
import { burgerApi } from './burgerApi';
import { modalSlice } from './modal-slice';

export const reducer = combineReducers({
    [burgerApi.reducerPath]: burgerApi.reducer,
    [modalSlice.reducerPath]: modalSlice.reducer,
  });