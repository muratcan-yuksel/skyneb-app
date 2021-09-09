import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [0];

export const liveOrders = createSlice({
  name: "live-orders",
  initialState: { value: initialStateValue },
  reducers: {
    getData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { getData } = liveOrders.actions;

export default liveOrders.reducer;
