import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RooState } from "../services/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RooState> = useSelector