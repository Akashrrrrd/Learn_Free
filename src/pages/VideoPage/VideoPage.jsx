import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player'; 
import './VideoPage.css';

const VideoPage = () => {
  const location = useLocation();
  const { videoLink, courseTitle } = location.state || {};
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [percentageWatched, setPercentageWatched] = useState(0);
  const [tokenRewarded, setTokenRewarded] = useState(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const onProgress = (progress) => {
    const { played } = progress;
    const percent = Math.floor(played * 100);
    setPercentageWatched(percent);
    if (percent === 100 && !tokenRewarded) {
      rewardToken();
      setTokenRewarded(true);
    }
  };

  const rewardToken = () => {
    console.log('Token rewarded for course completion!');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className={`video-page ${isFullscreen ? 'fullscreen' : ''}`}>
      {videoLink ? (
        <div className="video-container">
          <div className="video-header">
            <h1 className="video-title">{courseTitle || 'Course Video'}</h1>
            <button className="fullscreen-toggle" onClick={toggleFullscreen}>
              {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            </button>
          </div>
          <p className="percentage-watched">Watched: {percentageWatched}%</p> {/* Moved outside the video-header */}
          <div className="video-wrapper">
            <ReactPlayer
              url={videoLink}
              onProgress={onProgress}
              width="100%"
              height="100%"
              playing={true}
            />
          </div>
        </div>
      ) : (
        <div className="no-video">
          <h2>No video available for this course.</h2>
          <p>Please check back later or contact support if you believe this is an error.</p>
        </div>
      )}
    </div>
  );
};

export default VideoPage;
