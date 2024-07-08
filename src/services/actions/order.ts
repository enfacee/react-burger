import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendOrder as sendOrderApi, getOrderByNumber as getOrderByNumberApi } from "../api";

export const sendOrder = createAsyncThunk('order/sendOrder', sendOrderApi);

export const getOrderByNumber = createAsyncThunk('order/getOrderByNumber', getOrderByNumberApi)