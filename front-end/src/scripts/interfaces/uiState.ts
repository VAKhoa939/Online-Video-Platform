export type VideoMode = "recommend" | "history";

export interface UIState {
  searchTerm: string;
  videoMode: VideoMode;
}

export interface RootState {
  ui: UIState;
}
