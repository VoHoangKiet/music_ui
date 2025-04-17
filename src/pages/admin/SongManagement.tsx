import React, { useState } from "react";
import {
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
  Spin,
  notification,
  DatePicker,
  Select,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { TableContainer, ActionButton, StyledTable } from "./styles";
import { Song, useAllSongs } from "../../hook/song/useAllSongs";
// import { useUpdateSong } from "../../hook/song/useUpdateSong";
// import { useDeleteSong } from "../../hook/song/useDeleteSong";
import { useAllGenres } from "../../hook/genre/useAllGenres";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateSong } from "../../hook/song/useUpdateSong";
import { useDeleteSong } from "../../hook/song/useDeleteSong";

const { Option } = Select;

const SongManagement: React.FC = () => {
  const queryClient = useQueryClient();
  const { data: songs, isLoading } = useAllSongs();
  const { data: genres } = useAllGenres();
  const { mutate: updateSongMutation } = useUpdateSong();
  const { mutate: deleteSongMutation } = useDeleteSong();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSong, setEditingSong] = useState<Song | null>(null);
  const [form] = Form.useForm();

  if (isLoading || !songs) return <Spin size="large" />;

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Genre",
      dataIndex: ["genre", "name"],
      key: "genre",
    },
    {
      title: "Play Count",
      dataIndex: "playCount",
      key: "playCount",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Release Date",
      dataIndex: "releaseDate",
      key: "releaseDate",
      render: (date: string) => dayjs(date).format("YYYY-MM-DD"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Song) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingSong(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (song: Song) => {
    setEditingSong(song);
    setIsModalVisible(true);
  
    setTimeout(() => {
      form.setFieldsValue({
        ...song,
        genre: song.genre._id,
        releaseDate: dayjs(song.releaseDate),
      });
    }, 0);
  };
  

  const handleDelete = (song: Song) => {
    Modal.confirm({
      title: "Are you sure you want to delete this song?",
      onOk: () => {
        deleteSongMutation(song._id, {
          onSuccess: () => {
            message.success("Song deleted");
            queryClient.invalidateQueries({ queryKey: ["songs"] });
          },
          onError: (error: any) => {
            notification.error({
              message: "Failed to delete song",
              description: error.response?.data?.message || error.message,
            });
          },
        });
      },
    });
  };

  const handleModalOk = () => {
    form.validateFields().then((values) => {
      const payload = {
        ...values,
        releaseDate: values.releaseDate.toISOString(),
      };
      updateSongMutation(
        { songId: editingSong?._id || "", data: payload },
        {
          onSuccess: () => {
            message.success("Song updated");
            setIsModalVisible(false);
            form.resetFields();
            queryClient.invalidateQueries({ queryKey: ["songs"] });
          },
          onError: (error) => {
            notification.error({
              message: "Failed to update song",
              description: error.message,
            });
          },
        }
      );
    });
  };

  return (
    <TableContainer>
      <ActionButton type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
        Add Song
      </ActionButton>

      <StyledTable columns={columns} dataSource={songs} rowKey="_id" />

      <Modal
        title={"Edit Song"}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        destroyOnClose
      >
        {isModalVisible && (
          <Form form={form} layout="vertical">
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name="genre" label="Genre" rules={[{ required: true }]}>
              <Select placeholder="Select genre">
                {genres?.map((genre) => (
                  <Option value={genre._id} key={genre._id}>
                    {genre.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="lyric" label="Lyric">
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              name="releaseDate"
              label="Release Date"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name="thumbnail" label="Thumbnail (URL)">
              <Input />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </TableContainer>
  );
};

export default SongManagement;
