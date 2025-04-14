import { Modal, List, Checkbox, notification, Spin } from "antd";
import { useAddSongToPlaylist } from "../../../hook/playlist/useAddSongToPlaylist";
import { useAllMyPlaylists } from "../../../hook/playlist/useAllMyPlaylist";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface AddToPlaylistModalProps {
  open: boolean;
  onClose: () => void;
  songId: string;
}

export const AddToPlaylistModal = ({
  open,
  onClose,
  songId,
}: AddToPlaylistModalProps) => {
  const queryClient = useQueryClient();
  const { data: playlists, isLoading } = useAllMyPlaylists();
  const { mutate: toggleAddToPlaylist } = useAddSongToPlaylist();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Cập nhật checkbox được tick khi mở modal
  useEffect(() => {
    if (playlists && open) {
      const selected = playlists
        .filter((p) => p.songs?.some((s) => s._id === songId))
        .map((p) => p._id);
      setSelectedIds(selected);
    }
  }, [playlists, songId, open]);

  const handleToggle = (playlistId: string) => {
    toggleAddToPlaylist(
      { playlistId, songId },
      {
        onSuccess: () => {
          const isAlreadyIn = selectedIds.includes(playlistId);
          notification.success({
            message: isAlreadyIn
              ? "Removed from playlist"
              : "Added to playlist",
          });
          queryClient.invalidateQueries({ queryKey: ["playlists"] });

          // Cập nhật local checkbox state
          setSelectedIds((prev) =>
            isAlreadyIn
              ? prev.filter((id) => id !== playlistId)
              : [...prev, playlistId]
          );
        },
        onError: () => {
          notification.error({ message: "Something went wrong" });
        },
      }
    );
  };

  return (
    <Modal open={open} onCancel={onClose} footer={null} title="Add to Playlist">
      {isLoading ? (
        <Spin />
      ) : (
        <List
          dataSource={playlists}
          renderItem={(playlist) => (
            <List.Item
              actions={[
                <Checkbox
                  key={playlist._id}
                  checked={selectedIds.includes(playlist._id)}
                  onChange={() => handleToggle(playlist._id)}
                />,
              ]}
            >
              {playlist.name}
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
};
