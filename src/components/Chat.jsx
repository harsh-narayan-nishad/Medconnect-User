import React from 'react';
import ChatImage from '../assets/Chat.png';

const Chat = () => {
  return (
    <div className="text-white fixed right-4 bottom-0 transform -translate-y-1/2 px-4 py-4 rounded-full flex items-center justify-center">
      <section className="section video" aria-label="video">
        <div className="container ">
          <div className="video-card has-before has-bg-image ">
            <a href="Assets/ambulance.html">
              <button className="play-btn " aria-label="play video">
                <img
                  alt="Profile image 1"
                  className="w-16 h-16 rounded-full object-contain"
                  src={ChatImage}
                />
              </button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Chat;
