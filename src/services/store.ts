import { configureStore } from '@reduxjs/toolkit'
import { reducer } from './reducers/reducer'; 
import { socketMiddleware } from './middleware/socet-middleware';
import { wsFeedDisconnect, wsFeedConnect, wsProfileConnect, wsProfileDisconnect } from './actions/orders';
import { wsClose, wsConnecting, wsError, wsMessage, wsOpen } from './reducers/feed-orders';
import { wsClose as wsProfileClose, wsConnecting as wsProfileConnecting, wsError as wsProfileError, wsMessage as wsProfileMessage, wsOpen as wsProfileOpen } from './reducers/profile-orders';

const feedMiddleware = socketMiddleware({
  connect: wsFeedConnect,
  disconnect: wsFeedDisconnect,
  onConnecting: wsConnecting,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
});
const profileMiddleware = socketMiddleware({
  connect: wsProfileConnect,
  disconnect: wsProfileDisconnect,
  onConnecting: wsProfileConnecting,
  onOpen: wsProfileOpen,
  onClose: wsProfileClose,
  onError: wsProfileError,
  onMessage: wsProfileMessage,
});

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(feedMiddleware, profileMiddleware);
    },
  })

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch;