import "../../../css/home-page.css";
import VideoGrid from "./VideoGrid";
import { setVideoMode } from "../../state/uiSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

const HomePage = () => {
  const dispatch = useDispatch();
  const videoMode = useSelector((state: RootState) => state.ui.videoMode);

  return (
    <main className="home-page">
      <div>
        <button
          onClick={() => dispatch(setVideoMode("history"))}
          className={videoMode === "history" ? "btn-active" : ""}
        >
          Video History
        </button>
        <button
          onClick={() => dispatch(setVideoMode("recommend"))}
          className={videoMode === "recommend" ? "btn-active" : ""}
        >
          Recommended Videos
        </button>
      </div>
      <VideoGrid />
    </main>
  );
};

export default HomePage;
