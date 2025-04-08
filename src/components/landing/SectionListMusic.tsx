import { PlayCircleOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import styled from "styled-components";

const musicList = [
  {
    imageUrl:
      "https://media.vov.vn/sites/default/files/styles/large/public/2025-04/487796994_1131466462113917_481745465163557361_n.jpg",
    title: "Nước Mắt Cá Sấu",
    subTitle: "HIEUTHUHAI",
  },
  {
    imageUrl:
      "https://i1.sndcdn.com/artworks-MB8Olhqn4KyKz34Q-AShOtQ-t500x500.jpg",
    title: "Bắc Bling",
    subTitle: "Hòa Minzy",
  },
  {
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu3op3dn58esjGplvwdVeKLtLC-vvKY6xXIw&s",
    title: "Sự nghiệp chướng",
    subTitle: "Pháo",
  },
  {
    imageUrl:
      "https://media.vov.vn/sites/default/files/styles/large/public/2025-04/487796994_1131466462113917_481745465163557361_n.jpg",
    title: "Nước Mắt Cá Sấu",
    subTitle: "HIEUTHUHAI",
  },
  {
    imageUrl:
      "https://i1.sndcdn.com/artworks-MB8Olhqn4KyKz34Q-AShOtQ-t500x500.jpg",
    title: "Bắc Bling",
    subTitle: "Hòa Minzy",
  },
];

const Title = styled.div`
  padding: 20px 0;
  font-weight: bold;
  font-size: 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000;
  border-radius: 10px;
`;

export const SectionListMusic = () => {

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Title>Trending Songs</Title>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {musicList.map((music, index) => (
          <MusicCard
            key={index}
            imageUrl={music.imageUrl}
            title={music.title}
            subTitle={music.subTitle}
          />
        ))}
      </div>
    </div>
  );
};

const StyledCard = styled(Card)`
  width: 240px;
  border-radius: 15px;
  background-color: #121212;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.6);
  color: #fff;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.8);
  }
`;

const StyledImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 2px solid #ccc;
`;

const PlayButton = styled(Button)`
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  padding: 15px;
  color: #fff;
  font-size: 22px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.9);
  }
`;

const StyledTitle = styled.h3`
  text-align: center;
  font-size: 18px;
  margin: 10px 0;
  color: #fff;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6347;
  }
`;

const StyledSubTitle = styled.p`
  text-align: center;
  color: #aaa;
  font-size: 14px;
  &:hover {
    color: #fff;
  }
`;

interface MusicCardType {
  imageUrl: string;
  title: string;
  subTitle: string;
}

const MusicCard = ({ imageUrl, title, subTitle }: MusicCardType) => {
  const handlePointerEnter = () => {
    console.log("Pointer entered");
  };
  
  const handlePointerLeave = () => {
    console.log("Pointer left");
  };
  return (
    <StyledCard hoverable>
      <div style={{ position: "relative" }}>
        <StyledImage alt="album" src={imageUrl} />
        <PlayButton
          shape="circle"
          icon={
            <PlayCircleOutlined
              onPointerEnterCapture={handlePointerEnter}
              onPointerLeaveCapture={handlePointerLeave}
            />
          }
        />
      </div>
      <StyledTitle>{title}</StyledTitle>
      <StyledSubTitle>{subTitle}</StyledSubTitle>
    </StyledCard>
  );
};
