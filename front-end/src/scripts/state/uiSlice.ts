import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UIState, VideoMode } from "../interfaces/uiState";

const initialState: UIState = {
  searchTerm: "",
  videoMode: "recommend",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      console.log(state.searchTerm);
    },
    setVideoMode: (state, action: PayloadAction<VideoMode>) => {
      state.videoMode = action.payload;
      console.log(state.videoMode);
    },
  },
});

export const { setSearchTerm, setVideoMode } = uiSlice.actions;
export default uiSlice.reducer;
