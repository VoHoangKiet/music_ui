import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Slider, Button } from "antd";
import {
  PlayCircleFilled,
  PauseCircleFilled,
  StepBackwardOutlined,
  StepForwardOutlined,
  SoundOutlined,
  PictureOutlined,
  PlusOutlined,
  MenuOutlined,
  ExpandOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import { useAudioPlayer } from "../../../context/AudioPlayerContext";

const Wrapper = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #fffbea;
  color: #333;
  display: flex;
  justify-content: space-between;
  padding: 12px 24px;
  z-index: 999;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 200px;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SongInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  font-weight: bold;
  color: #111;
`;

const Artist = styled.span`
  font-size: 12px;
  color: #555;
`;

const CoverImg = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 4px;

  .anticon {
    font-size: 20px;
    color: #777;
  }

  .anticon-play-circle,
  .anticon-pause-circle {
    font-size: 36px;
    color: #facc15;
  }
`;

const Progress = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  max-width: 600px;

  .ant-slider {
    flex: 1;
  }

  .ant-slider-track {
    background-color: #facc15;
  }

  .ant-slider-handle {
    border-color: #facc15;
  }

  .ant-slider-rail {
    background-color: #eee;
  }
`;

const MusicPlayer: React.FC = () => {
  const { currentTrack } = useAudioPlayer();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    if (currentTrack && audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentTrack]);
  const togglePlay = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const onTimeUpdate = () => {
    if (!audioRef.current) return;
    setProgress(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const onSliderChange = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
      setProgress(value);
    }
  };

  const formatTime = (sec: number) => {
    if (isNaN(sec)) return "0:00";
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <Wrapper
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      style={!currentTrack ? { display: "none" } : undefined}
    >
      <Left>
        <CoverImg src="data:image/jpeg;base64,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" />
        <SongInfo>
          <Title>{currentTrack?.title}</Title>
          <Artist>{currentTrack?.title}</Artist>
        </SongInfo>
        <Button icon={<PlusOutlined />} type="text" />
      </Left>

      <Center>
        <Controls>
          <RetweetOutlined />
          <StepBackwardOutlined />
          {isPlaying ? (
            <PauseCircleFilled onClick={togglePlay} />
          ) : (
            <PlayCircleFilled onClick={togglePlay} />
          )}
          <StepForwardOutlined />
          <PictureOutlined />
        </Controls>
        <Progress>
          <span style={{ fontSize: 12 }}>{formatTime(progress)}</span>
          <Slider
            value={progress}
            max={duration}
            onChange={onSliderChange}
            tooltip={{ open: false }}
          />
          <span style={{ fontSize: 12 }}>{formatTime(duration)}</span>
        </Progress>
      </Center>

      <Right>
        <Button icon={<PlayCircleFilled />} type="text" />
        <Button icon={<MenuOutlined />} type="text" />
        <Button icon={<SoundOutlined />} type="text" />
        <Slider defaultValue={60} style={{ width: 80 }} />
        <Button icon={<ExpandOutlined />} type="text" />
      </Right>

      <audio
        ref={audioRef}
        src={currentTrack?.secureUrl}
        onTimeUpdate={onTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
    </Wrapper>
  );
};

export default MusicPlayer;
