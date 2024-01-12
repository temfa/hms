import { createSlice } from "@reduxjs/toolkit";
const startupPageSlice = createSlice({
  name: "startupPage",
  initialState: 0,
  reducers: {
    setStartupPage: (state, { payload }) => {
      return payload;
    },
    clearStartupPage: () => {
      return 0;
    },
  },
});

const { reducer, actions } = startupPageSlice;
export const { setStartupPage, clearStartupPage } = actions;
export default reducer;
