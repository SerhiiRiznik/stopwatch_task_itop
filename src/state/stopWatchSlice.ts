import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType ={
   started: boolean
   isActive: boolean
   time: number
}

const initialState: initialStateType = {
  started: false,
  isActive: false,
  time: 0,
}

export const stopWatchSlice = createSlice({
  name: "stopWatch",
  initialState,
  reducers: {
    setTime: (state, action: PayloadAction<number>) => {
      state.time += action.payload;
    },
    setStart: (state, action: PayloadAction<boolean>) => {
      state.started = action.payload;
    },
    resetTime: (state) => {
      state.time = 0;
    },
    setIsActive: (state, action: PayloadAction<boolean>) => {
      state.isActive = action.payload;
    },
  },
});

export const { setTime, setStart, resetTime, setIsActive } = stopWatchSlice.actions;
export default stopWatchSlice.reducer;
