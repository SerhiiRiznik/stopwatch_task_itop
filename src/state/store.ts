
import { configureStore } from '@reduxjs/toolkit'
import stopWatchSlice from './stopWatchSlice'

export const store = configureStore({
  reducer: {
    stopWatch : stopWatchSlice
  },
})
export type RootState = ReturnType<typeof store.getState>