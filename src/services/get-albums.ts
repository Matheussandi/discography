import { api } from "@/lib/api";

export async function getAlbums() {
  const response = await api.get(`/album`, {
    headers: {
      Authorization: `matheussandi@hotmail.com`,
    },
  });
  const albuns = await response.data;

  return albuns || [];
}
