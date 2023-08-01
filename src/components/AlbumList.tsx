"use client";

import { useCallback, useEffect, useState } from "react";

import { formatDurationToMinutes } from "@/utils/formatDurationToMinutes";
import { api } from "@/lib/api";

import { MdDelete, MdClose } from "react-icons/md";

import Link from "next/link";

import { ConfirmationModal } from "./ConfirmationModal";
import { AlbumProps } from "@/types";

export function AlbumList() {
  const [albums, setAlbums] = useState<AlbumProps[]>([]);
  const [albumsSearch, setAlbumsSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<{
    type: "album" | "track";
    id: number;
  } | null>(null);
  const [itemName, setItemName] = useState<string>("");

  const handleSearchAlbums = useCallback(async () => {
    try {
      const response = await api.get(`/album`, {
        headers: {
          Authorization: `matheussandi@hotmail.com`,
        },
      });
      const albumSearch = albumsSearch.toLocaleLowerCase();

      const filteredAlbums = response.data.data.filter(({ name }: AlbumProps) =>
        name.toLocaleLowerCase().includes(albumSearch)
      );

      setAlbums(filteredAlbums);
    } catch (error) {
      console.error("Erro ao buscar álbuns:", error);
    }
  }, [albumsSearch]);

  const handleAlbumsListDefault = useCallback(async () => {
    try {
      const response = await api.get(`/album`, {
        headers: {
          Authorization: `matheussandi@hotmail.com`,
        },
      });
      setAlbums(response.data.data);
    } catch (error) {
      console.error("Erro ao carregar lista de álbuns:", error);
    }
  }, []);

  const handleRemoveAlbum = useCallback(async (albumIdToRemove: number) => {
    try {
      await api.delete(`/album/${albumIdToRemove}`, {
        headers: {
          Authorization: `matheussandi@hotmail.com`,
        },
      });

      setAlbums((prevAlbums) =>
        prevAlbums.filter((album) => album.id !== albumIdToRemove)
      );
    } catch (error) {
      console.error("Erro ao remover álbum:", error);
    }
  }, []);

  const handleRemoveTrack = useCallback(async (trackIdToRemove: number) => {
    try {
      await api.delete(`/track/${trackIdToRemove}`, {
        headers: {
          Authorization: `matheussandi@hotmail.com`,
        },
      });

      setAlbums((prevAlbums) =>
        prevAlbums.map((album) => ({
          ...album,
          tracks: album.tracks.filter((track) => track.id !== trackIdToRemove),
        }))
      );
    } catch (error) {
      console.error("Erro ao remover faixa:", error);
    }
  }, []);

  useEffect(() => {
    handleAlbumsListDefault();
  }, [albumsSearch, handleAlbumsListDefault, handleSearchAlbums]);

  const handleConfirmRemoval = useCallback(async () => {
    if (itemToRemove) {
      if (itemToRemove.type === "album") {
        await handleRemoveAlbum(itemToRemove.id);
      } else if (itemToRemove.type === "track") {
        await handleRemoveTrack(itemToRemove.id);
      }

      closeModal();
    }
  }, [handleRemoveAlbum, handleRemoveTrack, itemToRemove]);

  const openModal = (type: "album" | "track", id: number, name: string) => {
    setItemToRemove({ type, id });
    setItemName(name);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setItemToRemove(null);
  };

  return (
    <div className="bg-white bg-opacity-80 px-5 py-2">
      <div className="rounded">
        <div className="mb-4 flex items-center justify-between">
          <div className="w-full">
            <p className="text-gray-500 mb-1">Digite uma palavra chave</p>
            <div className="relative flex">
              <input
                type="text"
                placeholder="Min"
                value={albumsSearch}
                onChange={(e) => setAlbumsSearch(e.target.value)}
                className="w-full rounded-full border-none py-2 px-4 focus:border-primary focus:outline-none"
              />
              <button
                className="mx-2 bg-blue-600 text-white px-12 py-3 rounded-full"
                onClick={handleSearchAlbums}
              >
                Procurar
              </button>
            </div>

            <div className="flex justify-around mt-5 text-white">
              <Link
                href={"/album"}
                className="bg-blue-600 p-4 rounded-full hover:bg-blue-500 transition ease-in-out"
              >
                Adicionar Álbum
              </Link>
              <Link
                href={"/track"}
                className="bg-blue-600 p-4 rounded-full hover:bg-blue-500 transition ease-in-out"
              >
                Adicionar Faixa
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 space-y-4">
          {albums.length === 0 ? (
            <p>Nenhum álbum encontrado.</p>
          ) : (
            albums.map((album) => (
              <div key={album.id}>
                <div className="flex items-center justify-between">
                  <strong>
                    Álbum: {album.name}, {album.year}
                  </strong>
                  <MdDelete
                    color="red"
                    size={26}
                    onClick={() => openModal("album", album.id, album.name)}
                    className="cursor-pointer"
                  />
                </div>
                <ul className="mt-2 w-full">
                  <li className="flex justify-betwee">
                    <span className="w-1/4">N°</span>
                    <span className="w-1/4">Faixa</span>
                    <span className="w-1/4">Duração</span>
                    <span className="w-1/4">Remover</span>
                  </li>
                  {album.tracks.map((track) => (
                    <li key={track.id} className="flex justify-between">
                      <span className="w-1/4">{track.number}</span>
                      <span className="w-1/4">{track.title}</span>
                      <span className="w-1/4">
                        {formatDurationToMinutes(track.duration)}
                      </span>
                      <span className="w-1/4">
                        <MdClose
                          color="red"
                          size={26}
                          onClick={() =>
                            openModal("track", track.id, track.title)
                          }
                          className="cursor-pointer"
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
      <ConfirmationModal
        isOpen={showModal}
        onClose={closeModal}
        onConfirm={handleConfirmRemoval}
        itemName={itemName}
      />
    </div>
  );
}
