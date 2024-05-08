import { createSlice } from "@reduxjs/toolkit";

export const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        endDate: '',
        startDate: '',
        UserId:'',
        HouseId:''
    },
    reducers: {
        setdata: (state, action) => {
            state.endDate = action.payload.endDate;
            state.startDate = action.payload.startDate;
            // state.UserId = action.payload.UserId;
            state.HouseId = action.payload.HouseId;
        },
    },
  })
  
   export const { setdata } = bookingSlice.actions
  
  export default bookingSlice.reducer