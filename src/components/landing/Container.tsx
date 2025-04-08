import { Button, Layout } from "antd";
import styled from "styled-components";
import { SectionListMusic } from "./SectionListMusic";

const { Sider, Content } = Layout;

const Wrapper = styled.div`
  background-color: rgba(240, 242, 245, 0.5);
  min-height: 90vh;
`;

const CustomLayout = styled(Layout)`
  background-color: transparent !important;
  display: flex;
  flex-direction: row;
  gap: 15;
`;

const CustomSider = styled(Sider)`
  background-color: transparent !important;
  backdrop-filter: blur(10px);
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
`;

const CustomContent = styled(Content)`
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0px 24px 24px 24px;
  box-shadow: inset 2px 0 4px rgba(0, 0, 0, 0.1);
  height: calc(100vh - 80px);
  overflow-y: auto;
`;

const HeaderSider = styled.div`
  padding: 20px;
  font-weight: bold;
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const LandingContainer = () => {
  return (
    <Wrapper>
      <CustomLayout>
        <CustomSider theme="light" width={300}>
          <HeaderSider>
            <div>Your Library</div>
            <Button>
              <b style={{ fontSize: 18 }}>+</b>
            </Button>
          </HeaderSider>
        </CustomSider>
        <CustomContent>
            <SectionListMusic/>
            <SectionListMusic/>
            <SectionListMusic/>
            <SectionListMusic/>
        </CustomContent>
      </CustomLayout>
    </Wrapper>
  );
};
