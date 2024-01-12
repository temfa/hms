import { createSlice } from "@reduxjs/toolkit";
const mobileSlice = createSlice({
  name: "mobile",
  initialState: false,
  reducers: {
    setMobile: (state, { payload }) => {
      return payload;
    },
    clearMobile: () => {
      return false;
    },
  },
});

const { reducer, actions } = mobileSlice;
export const { setMobile, clearMobile } = actions;
export default reducer;
