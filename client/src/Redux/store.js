import { configureStore } from '@reduxjs/toolkit'
import bookingReducer from './bookingSlice'

export default configureStore({
  reducer: {
    booking: bookingReducer,
  }
})