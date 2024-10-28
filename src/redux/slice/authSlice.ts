import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  role: "",
  emailVerify: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onAuthStateSuccess: (state) => {
      state.isAuth = true;
    },
    onAuthStateFail: (state) => {
      state.isAuth = false;
    },
  },
});

export const stateAuth = (state: any) => state.auth.isAuth;
export const { onAuthStateSuccess, onAuthStateFail } = authSlice.actions;

export default authSlice.reducer;
