import { useQuery } from "@tanstack/react-query";
import { useAccessToken } from "../auth/useUserInfo";
import api from "../../apis/axiosCustom";
import { appUrls } from "../../apis/contants";
import { Song } from "../song/useAllSongs";

export interface Playlist {
  _id: string;
  name: string;
  description: string;
  songs: Song[];
  createdAt: Date;
  updatedAt: Date;
}

export function useAllMyPlaylists() {
  const accessToken = useAccessToken();

  return useQuery<Playlist[]>({
    queryKey: ["playlists"],
    queryFn: () =>
      api
        .get(`${appUrls.backendUrl}/playlist/me`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => response.data.data),
    enabled: !!accessToken,
  });
}
