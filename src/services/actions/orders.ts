import { createAction } from "@reduxjs/toolkit";

export const wsFeedConnect = createAction<string, 'FEED_CONNECT'>('FEED_CONNECT');
export const wsFeedDisconnect = createAction('FEED_DISCONNECT')

export const wsProfileConnect = createAction<string, 'PROFILE_CONNECT'>('PROFILE_CONNECT');
export const wsProfileDisconnect = createAction('PROFILE_DISCONNECT')