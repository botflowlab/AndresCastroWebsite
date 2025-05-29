import React, { useState } from 'react';
import ReactPlayer from 'react-player';

function VideoPlayer() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ position: 'relative', paddingTop: '56.25%' }} className="rounded-lg overflow-hidden bg-white mb-8">
      <div 
        className={`absolute inset-0 bg-white ${isLoading ? 'opacity-100' : 'opacity-0'}`}
      />
      <ReactPlayer
        url="https://vimeo.com/video/1088748083"
        width="100%"
        height="100%"
        controls={false}
        playing={true}
        loop={true}
        muted={true}
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
        onReady={() => setIsLoading(false)}
        playsinline={true}
        config={{
          vimeo: {
            playerOptions: {
              background: true,
              autoplay: true,
              controls: false,
              responsive: true,
              dnt: true
            }
          }
        }}
      />
    </div>
  );
}

export default VideoPlayer;