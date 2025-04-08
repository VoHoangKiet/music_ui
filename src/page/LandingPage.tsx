import { Layout, Menu, Button, Space } from "antd";
import styled from "styled-components";
import { motion } from "framer-motion";
import { LandingContainer, SearchBar } from "../components/landing";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMemo } from "react";

const { Header, Content } = Layout;

const AppContainer = styled(motion.create(Layout))`
  min-height: 100vh;
  background-color: #fff;
  background-image: url("/landing-page.jpg");
  background-size: cover;
  background-position: center;
`;

const HeaderLanding = styled(Header)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: transparent;
`;

const MenuLanding = styled(Menu)`
  background-color: transparent;
  justify-content: space-evenly;
  width: 50%;
  .ant-menu-item {
    padding: 0 15px;
  }
  .ant-menu-item-selected {
    font-weight: bold;
    color: #000 !important;
  }
  .ant-menu-item-active {
    font-weight: bold;
    color: #000 !important;
    &::after {
      border-bottom-color: transparent !important;
    }
  }
  .ant-menu-item-selected::after {
    border-bottom-color: transparent !important;
  }
`;

const Branding = styled.div`
  font-family: "Playfair Display", serif;
  font-size: 28px;
  font-weight: bold;
  color: #000000;
`;

const ButtonSignUp = styled(Button)`
  color: #ffb30e;
  &:hover {
    color: black !important;
  }
`;

const ButtonProfile = styled(Button)`
  color: #ffb30e;
  width: 100px;
  &:hover {
    color: black !important;
  }
`;

const menuItems = [
  { key: "1", label: "Home" },
  { key: "2", label: "Album" },
  { key: "3", label: "New Release" },
  { key: "4", label: "Category" },
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleSignIn = () => {
    navigate("/login");
  };
  const handleSignUp = () => {
    navigate("/register");
  };
  const renderBtnProfile = useMemo(() => {
    if (user) {
      return (
        <Space>
          <ButtonProfile><b>User</b></ButtonProfile>
        </Space>
      )
    } else {
      return (
        <Space>
          <ButtonSignUp type="default" shape="round" onClick={handleSignUp}>
            <b>Sign Up</b>
          </ButtonSignUp>
          <Button type="text" shape="round" onClick={handleSignIn}>
            <b>Sign In</b>
          </Button>
        </Space>
      )
    }
  },[user]);
  return (
    <AppContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <HeaderLanding>
        <Branding>Spotifo</Branding>
        <SearchBar />
        <MenuLanding mode="horizontal" items={menuItems} />
        {renderBtnProfile}
      </HeaderLanding>
      <Content style={{ padding: "0px 20px" }}>
        <LandingContainer />
      </Content>
    </AppContainer>
  );
};

export default LandingPage;
