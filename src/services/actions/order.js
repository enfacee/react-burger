import { createAsyncThunk } from "@reduxjs/toolkit";
import { sendOrder as sendOrderApi } from "../api";

export const sendOrder = createAsyncThunk('order/sendOrder', sendOrderApi);