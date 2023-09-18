import { createSlice } from '@reduxjs/toolkit'

export const bgSlice = createSlice({
    // ten cua slice reducer
  name: 'bg',
  // gias tri state ban dau
  initialState: {
    backgroundColor: 'red'
  },
  // phuong thuc tinh toan reducer
  reducers: {
    updateBg: (state, action) => {
        state.backgroundColor = action.payload;
    },
   
  },
})

// Action creators are generated for each case reducer function
export const { updateBg } = bgSlice.actions

export default bgSlice.reducer