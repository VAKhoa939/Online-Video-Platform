import { useState, useEffect } from 'react'
import '../../css/video.css'
import {recommendedVideoList, watchedVideoList, Video} from '../interfaces/video'

const HomePage = () => {
  const [videoList, setVideoList] = useState<Video[]>([]);
  const [videoMode, setVideoMode] = useState<string>('recommend');
  //setVideoMode('recommend');
  
  useEffect(() => {
    setVideoList((videoMode === 'recommend') ? recommendedVideoList : watchedVideoList);
  }, [videoMode]);

  return (
    <main>
      <div className='video-grid'>
        {videoList.map((video) => {
          return (
            <div className="video-preview">
              <div className="thumbnail-row">
                  <a href={video.videoLink}>
                      <img className="thumbnail" src={video.thumbnail}/>
                  </a>
                  <div className="video-time">
                      {video.time}
                  </div>
              </div>
      
              <div className="video-info-grid">
                  <div className="channel-picture-column">
                      <a href={video.channelLink}>
                          <img className="channel-picture" src={video.channelPicture}/>
                      </a>
                  </div>
      
                  <div className="video-info-column">
                      <p className="video-title">
                          <a className="video-link" href={video.videoLink}>
                              ${video.title}
                          </a>
                      </p>
                  
                      <p className="channel-name">
                          <a className="channel-link" href={video.channelLink}>
                              ${video.channelName}
                          </a>
                      </p>
                  
                      <p className="video-stats">
                          ${video.stats}
                      </p>
                  </div>
              </div>
            </div>
        )})}
      </div>
    </main>
  )
}

export default HomePage