import { useMutation } from "@tanstack/react-query";
import api from "../../apis/axiosCustom";
import { appUrls } from "../../apis/contants";
import { useAccessToken } from "../auth/useUserInfo";
interface AddSongToPlaylistBody {
  songId: string;
  playlistId: string;
}
export const useAddSongToPlaylist = () => {
  const accessToken = useAccessToken();
  return useMutation({
    mutationFn: async (body: AddSongToPlaylistBody) => {
      const res = await api.post(
        `${appUrls.backendUrl}/playlist/${body.playlistId}/toggle-song/${body.songId}`, {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return res.data;
    },
  });
};
