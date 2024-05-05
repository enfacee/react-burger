import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './reducer'; 
import { burgerApi } from './burgerApi';


export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(burgerApi.middleware);
    },
  })