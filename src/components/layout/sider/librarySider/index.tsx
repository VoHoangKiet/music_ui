import { Layout, Button, message, Modal, Form, Input } from "antd";
import styled from "styled-components";
import { HeartFilled } from "@ant-design/icons";
import { useFavoriteSongs } from "../../../../hook/song/useFavoriteSongs";
import { MyPlaylistItem } from "../../../playlist/playlistItem";
import { useAllMyPlaylists } from "../../../../hook/playlist/useAllMyPlaylist";
import { useDeletePlaylist } from "../../../../hook/playlist/useDeletePlaylist";
import { useQueryClient } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePlaylist } from "../../../../hook/playlist/useCreatePlaylist";

const { Sider } = Layout;

const CustomSider = styled(Sider)`
  background-color: transparent;
  backdrop-filter: blur(10px);
  border-right: 1px solid rgba(0, 0, 0, 0.05);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  color: #222;
`;

const CreateButton = styled(Button)`
  background: transparent;
  color: #222;
  font-weight: 500;
  border: none;
  &:hover {
    color: #ff5e00;
  }
`;

const PlaylistList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 12px;
`;

const PlaylistItem = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  gap: 12px;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Thumbnail = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #c850c0, #ffcc70);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PlaylistInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PlaylistTitle = styled.div`
  font-weight: 600;
  font-size: 16px;
  color: #111;
`;

const PlaylistDescription = styled.div`
  font-size: 12px;
  color: #666;
`;

type Props = {
  width?: number;
};

export const LibrarySider = ({ width = 300 }: Props) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { data } = useFavoriteSongs();
  const { data: playlists } = useAllMyPlaylists();
  const { mutate: deletePlaylist } = useDeletePlaylist();
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const { mutate: createPlaylist } = useCreatePlaylist();
  const [isShowModalCreate, setIsShowModalCreate] = useState(false);
  const [form] = Form.useForm();

  const handleDelete = (playlistId: string) => {
    if (playlistId) {
      deletePlaylist(playlistId, {
        onSuccess: () => {
          message.success("Delete playlist success");
          queryClient.invalidateQueries({ queryKey: ["playlists"] });
          setIsShowModalDelete(false);
        },
        onError: () => {
          message.error("Delete playlist fail");
          setIsShowModalDelete(false);
        },
      });
    }
  };
  const handleCreate = () => {
    form.validateFields().then((values) => {
      createPlaylist(values, {
        onSuccess: () => {
          message.success("Tạo playlist thành công");
          queryClient.invalidateQueries({ queryKey: ["playlists"] });
          setIsShowModalCreate(false);
          form.resetFields();
        },
        onError: () => {
          message.error("Tạo playlist thất bại");
        },
      });
    });
  };
  return (
    <CustomSider theme="light" width={width}>
      <Header>
        <div>Thư viện</div>
        <CreateButton onClick={() => setIsShowModalCreate(true)}>+ Tạo</CreateButton>
      </Header>

      <PlaylistList>
        <PlaylistItem>
          <Thumbnail>
            <HeartFilled style={{ fontSize: 24, color: "white" }} />
          </Thumbnail>
          <PlaylistInfo>
            <PlaylistTitle>Bài hát đã thích</PlaylistTitle>
            <PlaylistDescription>
              Danh sách phát • {data?.length || 0} bài hát
            </PlaylistDescription>
          </PlaylistInfo>
        </PlaylistItem>
        {playlists?.map((playlist) => (
          <Fragment key={playlist._id}>
            <MyPlaylistItem
              key={playlist._id}
              name={playlist.name}
              description={playlist.description}
              songCount={playlist.songs.length}
              onDelete={() => setIsShowModalDelete(!isShowModalDelete)}
              onClick={() => navigate(`/playlist/${playlist._id}`)}
            />
            <Modal
              title="Confirm Deletion"
              open={isShowModalDelete}
              onOk={() => handleDelete(playlist._id)}
              onCancel={() => setIsShowModalDelete(false)}
              okText="Delete"
              cancelText="Cancel"
            >
              <p>Are you sure you want to delete this playlist?</p>
            </Modal>
          </Fragment>
        ))}
      </PlaylistList>
      <Modal
        title="Tạo playlist mới"
        open={isShowModalCreate}
        onOk={handleCreate}
        onCancel={() => setIsShowModalCreate(false)}
        okText="Tạo"
        cancelText="Hủy"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tên playlist"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập tên playlist" }]}
          >
            <Input placeholder="Nhập tên playlist" />
          </Form.Item>
          <Form.Item label="Mô tả" name="description">
            <Input.TextArea placeholder="Mô tả ngắn..." />
          </Form.Item>
        </Form>
      </Modal>
    </CustomSider>
  );
};
