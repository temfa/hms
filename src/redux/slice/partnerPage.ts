import { createSlice } from "@reduxjs/toolkit";
const partnerPageSlice = createSlice({
  name: "partnerPage",
  initialState: 0,
  reducers: {
    setPartnerPage: (state, { payload }) => {
      return payload;
    },
    clearPartnerPage: () => {
      return 0;
    },
  },
});

const { reducer, actions } = partnerPageSlice;
export const { setPartnerPage, clearPartnerPage } = actions;
export default reducer;
