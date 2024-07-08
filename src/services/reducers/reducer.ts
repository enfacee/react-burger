import { combineReducers } from 'redux';
import { burgerContructorSlice } from './burger-constructor';
import { userSlice } from './user';
import { ingredientsSlice } from './ingredients';
import { orderSlice } from './order';
import { feedOrdersSlice } from './feed-orders';
import { profileOrdersSlice } from './profile-orders';

export const reducer = combineReducers({
    [ingredientsSlice.reducerPath]: ingredientsSlice.reducer,
    [burgerContructorSlice.reducerPath]: burgerContructorSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [orderSlice.reducerPath]: orderSlice.reducer,
    [feedOrdersSlice.reducerPath]: feedOrdersSlice.reducer,
    [profileOrdersSlice.reducerPath]: profileOrdersSlice.reducer,
  });