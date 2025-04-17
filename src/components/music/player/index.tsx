import React, { useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useAudioPlayer } from "../../../context/AudioPlayerContext";

const Wrapper = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background-color: #fffbea;
  color: #333;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

const InfoOverlay = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  z-index: 2;
`;

const TrackImage = styled.img`
  background-color: #f5f5f5;
  width: 120px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
`;

const TrackDetails = styled.div`
  background-color: #f5f5f5;
  position: absolute;
  top: 25px;   
  left: 170px;    
  display: flex;
  flex-direction: column;
  color: #111;
  z-index: 3;    
`;

const Title = styled.div`
  background-color: #f5f5f5;
  font-size: 17px;
  font-weight: bold;
  width: 100%;
`;

const Artist = styled.div`
  font-size: 15px;
  color: #555;
  width: 100%;
  width: 50vw;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const IframeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;

  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const MusicPlayer: React.FC = () => {
  const { currentTrack } = useAudioPlayer();

  useEffect(() => {}, [currentTrack]);

  if (!currentTrack) return null;

  return (
    <Wrapper
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <InfoOverlay>
        <TrackImage src={currentTrack.thumbnail} alt="Track artwork" />
        <TrackDetails>
          <Title>{currentTrack.title}</Title>
          <Artist>{currentTrack.genre.name}</Artist>
        </TrackDetails>
      </InfoOverlay>

      <IframeContainer>
        <iframe
          src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${currentTrack.secureUrl}&auto_play=true`}
          allow="autoplay"
        />
      </IframeContainer>
    </Wrapper>
  );
};

export default MusicPlayer;
