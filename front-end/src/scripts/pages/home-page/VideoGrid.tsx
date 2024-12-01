import { getVideoList } from "../../interfaces/video";
import "../../../css/home-page.css";
import { useQuery } from "@tanstack/react-query";
import { defaultUser } from "../../interfaces/user";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const VideoGrid = () => {
  const searchTerm = useSelector((state: RootState) => state.ui.searchTerm);
  const videoMode = useSelector((state: RootState) => state.ui.videoMode);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const {
    data: videoList,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getVideoList(videoMode, defaultUser),
    queryKey: ["videoList", videoMode, defaultUser],
  });

  if (error)
    return (
      <div className="container">
        <p>Error: {error.message}</p>
      </div>
    );
  if (isLoading)
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );

  if (!videoList || videoList.length === 0) {
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

  const filteredVideoList = videoList.filter((video) =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  console.log(filteredVideoList);

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
