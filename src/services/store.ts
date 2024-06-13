import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './reducers/reducer'; 


export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware();
    },
  })

export type RooState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;