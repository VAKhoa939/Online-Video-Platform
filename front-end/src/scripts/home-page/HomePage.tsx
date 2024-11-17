import { useState, useEffect } from "react";
import "../../css/video.css";
import { Video } from "../interfaces/video";

type VideoMode = "recommend" | "history";

const HomePage = () => {
  const [videoMode, setVideoMode] = useState<VideoMode>("recommend");
  const [videoList, setVideoList] = useState<Video[]>([]);
  const VIDEO_API_URL = `${import.meta.env.VITE_API_URL}/video`;

  useEffect(() => {
    if (videoMode !== "recommend") {
      setVideoList([]); // history videos
      return;
    }
    console.log(VIDEO_API_URL);
    fetch(VIDEO_API_URL).then(async (res) => {
      const data = (await res.json()) as Video[];
      setVideoList([...data]);
    });
  }, [videoMode, VIDEO_API_URL]);

  return (
    <main>
      <div className="mode-btn-container">
        <button onClick={() => setVideoMode("history")}>Video History</button>
        <button onClick={() => setVideoMode("recommend")}>
          Recommended Videos
        </button>
      </div>
      <div className="video-grid">
        {videoList.map((video) => {
          return (
            <div className="video-preview">
              <div className="thumbnail-row">
                <a href={video.videoLink}>
                  <img
                    className="thumbnail"
                    src={`${import.meta.env.VITE_API_PUBLIC_URL}/thumbnails/${
                      video.thumbnail
                    }`}
                  />
                </a>
                <div className="video-time">{video.time}</div>
              </div>

              <div className="video-info-grid">
                <div className="channel-picture-column">
                  <a href={video.channelLink}>
                    <img
                      className="channel-picture"
                      src={`${
                        import.meta.env.VITE_API_PUBLIC_URL
                      }/channel-pictures/${video.channelPicture}`}
                    />
                  </a>
                </div>

                <div className="video-info-column">
                  <p className="video-title">
                    <a className="video-link" href={video.videoLink}>
                      {video.title}
                    </a>
                  </p>

                  <p className="channel-name">
                    <a className="channel-link" href={video.channelLink}>
                      {video.channelName}
                    </a>
                  </p>

                  <p className="video-stats">{video.stats}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
