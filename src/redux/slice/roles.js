import { createSlice } from "@reduxjs/toolkit";
const rolesSlice = createSlice({
  name: "roles",
  initialState: {},
  reducers: {
    setRoles: (state, { payload }) => {
      return payload;
    },
    clearRoles: () => {
      return "";
    },
  },
});

const { reducer, actions } = rolesSlice;
export const { setRoles, clearRoles } = actions;
export default reducer;
