import {
  getRecommendedVideos,
  getVideoHistory,
  Video,
} from "../../interfaces/video";
import "../../../css/home-page.css";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import { useEffect, useState } from "react";

const VideoGrid = () => {
  const searchTerm = useSelector((state: RootState) => state.ui.searchTerm);
  const videoMode = useSelector((state: RootState) => state.ui.videoMode);
  const [videos, setVideos] = useState<Video[]>([] as Video[]);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const {
    data: recomendedVideos,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getRecommendedVideos(auth.user),
    queryKey: ["videos", videoMode, auth.user],
    enabled: videoMode === "recommend",
  });

  useEffect(() => {
    if (videoMode === "history") {
      setVideos(getVideoHistory(auth.user));
      return;
    }
    if (recomendedVideos && typeof recomendedVideos !== "undefined") {
      setVideos(recomendedVideos);
      return;
    }
  }, [videoMode, auth.user, recomendedVideos]);

  if (error)
    return (
      <div className="container">
        <p>
          Error:{" "}
          {isAxiosError(error) && error.response
            ? error.response?.data?.message
            : "Something went wrong"}
        </p>
      </div>
    );
  if (isLoading)
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );

  if (!videos || videos.length === 0) {
    return (
      <div className="container">
        {videoMode === "history" && !auth.email ? (
          <div>
            <p>Login to access video history</p>
            <button onClick={() => navigate("/login")}>Login</button>
          </div>
        ) : (
          <p>No Video Found.</p>
        )}
      </div>
    );
  }

  const filteredVideoList = videos.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="video-grid">
      {filteredVideoList.map((video) => (
        <div key={video.videoLink} className="video-preview">
          <div className="thumbnail-row">
            <a href={video.videoLink}>
              <img
                className="thumbnail"
                src={`${import.meta.env.VITE_API_PUBLIC_URL}/thumbnails/${
                  video.thumbnail
                }`}
              />
            </a>
            <div className="video-time">{video.duration}</div>
          </div>
          <div className="video-info-grid">
            <div className="channel-picture-column">
              <a href={video.channelLink}>
                <img
                  className="channel-picture"
                  src={`${
                    import.meta.env.VITE_API_PUBLIC_URL
                  }/channel-pictures/${video.channelPicture}`}
                  alt=""
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
      ))}
    </div>
  );
};

export default VideoGrid;
