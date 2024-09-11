import { combineReducers } from "@reduxjs/toolkit";
import employeeSlice from "./slices/employeeSlice";

const reducer = combineReducers({
  employee: employeeSlice,
});

export type RootState = ReturnType<typeof reducer>;
export default reducer;
