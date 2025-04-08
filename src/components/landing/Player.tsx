// import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";
// import { Button, Icon } from "antd";

// const PlayerWrapper = styled.div`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   min-height: 100vh;
//   background-size: cover;
// `;

// const PlayerContainer = styled.div`
//   background: #eef3f7;
//   width: 410px;
//   min-height: 480px;
//   box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
//   border-radius: 15px;
//   padding: 30px;

//   @media screen and (max-width: 576px) {
//     width: 95%;
//     padding: 20px;
//     margin-top: 75px;
//     min-height: initial;
//     padding-bottom: 30px;
//     max-width: 400px;
//   }
// `;

// const CoverImage = styled.div`
//   width: 300px;
//   height: 300px;
//   margin-left: -70px;
//   position: relative;
//   z-index: 1;
//   border-radius: 15px;
//   background-image: url(${(props) => props.cover});
//   background-size: cover;
// `;

// const Controls = styled.div`
//   flex: 1;
//   padding-left: 20px;
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   @media screen and (max-width: 576px) {
//     flex-direction: row;
//     padding-left: 0;
//     width: 100%;
//     flex: unset;
//   }
// `;

// const ControlButton = styled(Button)`
//   display: inline-flex;
//   font-size: 30px;
//   padding: 5px;
//   margin-bottom: 10px;
//   color: #acb8cc;
//   cursor: pointer;
//   width: 50px;
//   height: 50px;
//   align-items: center;
//   justify-content: center;
//   position: relative;
//   transition: all 0.3s ease-in-out;
// `;

// const ProgressBar = styled.div`
//   width: 100%;
//   height: 6px;
//   background-color: #d0d8e6;
//   display: inline-block;
//   border-radius: 10px;
//   cursor: pointer;
// `;

// const CurrentProgress = styled.div`
//   height: inherit;
//   width: ${(props) => props.width}%;
//   background-color: #a3b3ce;
//   border-radius: 10px;
// `;

// const AlbumInfo = styled.div`
//   color: #71829e;
//   flex: 1;
//   padding-right: 60px;
//   user-select: none;
// `;

// const TrackName = styled.div`
//   font-size: 20px;
//   font-weight: bold;
//   margin-bottom: 12px;
//   line-height: 1.3em;
// `;

// const TrackArtist = styled.div`
//   font-weight: 400;
//   font-size: 20px;
//   opacity: 0.7;
//   line-height: 1.3em;
//   min-height: 52px;
// `;

// const Player = () => {
//   const [audio, setAudio] = useState(null);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
//   const [progress, setProgress] = useState(0);
//   const [duration, setDuration] = useState("00:00");
//   const [currentTime, setCurrentTime] = useState("00:00");
  
//   const audioRef = useRef(new Audio());

//   const tracks = [
//     {
//       name: "Mekanın Sahibi",
//       artist: "Norm Ender",
//       cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
//       source: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/mp3/1.mp3",
//       url: "https://www.youtube.com/watch?v=z3wAjJXbYzA",
//       favorited: false
//     },
//     // Add all tracks similarly
//   ];

//   useEffect(() => {
//     const audio = audioRef.current;
//     const currentTrack = tracks[currentTrackIndex];
//     audio.src = currentTrack.source;

//     audio.ontimeupdate = () => {
//       const percent = (audio.currentTime / audio.duration) * 100;
//       setProgress(percent);
//       setCurrentTime(formatTime(audio.currentTime));
//       setDuration(formatTime(audio.duration));
//     };

//     return () => {
//       audio.pause();
//     };
//   }, [currentTrackIndex]);

//   const formatTime = (timeInSeconds) => {
//     const minutes = Math.floor(timeInSeconds / 60);
//     const seconds = Math.floor(timeInSeconds - minutes * 60);
//     return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
//   };

//   const togglePlayPause = () => {
//     if (audioRef.current.paused) {
//       audioRef.current.play();
//       setIsPlaying(true);
//     } else {
//       audioRef.current.pause();
//       setIsPlaying(false);
//     }
//   };

//   const changeTrack = (direction) => {
//     setCurrentTrackIndex((prevIndex) => {
//       if (direction === "next") {
//         return prevIndex === tracks.length - 1 ? 0 : prevIndex + 1;
//       } else {
//         return prevIndex === 0 ? tracks.length - 1 : prevIndex - 1;
//       }
//     });
//   };

//   return (
//     <PlayerWrapper>
//       <PlayerContainer>
//         <div className="player__top">
//           <CoverImage cover={tracks[currentTrackIndex].cover}></CoverImage>
//           <AlbumInfo>
//             <TrackName>{tracks[currentTrackIndex].name}</TrackName>
//             <TrackArtist>{tracks[currentTrackIndex].artist}</TrackArtist>
//           </AlbumInfo>
//         </div>

//         <Controls>
//           <ControlButton onClick={() => changeTrack("prev")}>
//             <Icon type="left" />
//           </ControlButton>
//           <ControlButton onClick={togglePlayPause}>
//             <Icon type={isPlaying ? "pause" : "play"} />
//           </ControlButton>
//           <ControlButton onClick={() => changeTrack("next")}>
//             <Icon type="right" />
//           </ControlButton>
//         </Controls>

//         <ProgressBar onClick={(e) => {
//           const newProgress = (e.nativeEvent.offsetX / e.target.offsetWidth) * 100;
//           audioRef.current.currentTime = (newProgress / 100) * audioRef.current.duration;
//           setProgress(newProgress);
//         }}>
//           <CurrentProgress width={progress} />
//         </ProgressBar>

//         <div>
//           <span>{currentTime}</span> / <span>{duration}</span>
//         </div>
//       </PlayerContainer>
//     </PlayerWrapper>
//   );
// };

// export default Player;
