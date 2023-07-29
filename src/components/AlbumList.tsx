"use client";

import { useCallback, useEffect, useState } from "react";

import { formatDurationToMinutes } from "@/utils/formatDurationToMinutes";
import { api } from "@/lib/api";

import { MdDelete, MdSearch, MdClose } from "react-icons/md";

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

  // Função para buscar álbuns com base na string de busca
  const handleSearchAlbums = useCallback(async () => {
    try {
      const response = await api.get(`/album`, {
        headers: {
          Authorization: `matheussandi@hotmail.com`,
        },
      });
      const albumSearch = albumsSearch.toLocaleLowerCase();

      // Filtra os álbuns que contêm o valor da variável albumSearch no nome
      const filteredAlbums = response.data.data.filter(({ name }: AlbumProps) =>
        name.toLocaleLowerCase().includes(albumSearch)
      );

      setAlbums(filteredAlbums);
    } catch (error) {
      console.error("Erro ao buscar álbuns:", error);
    }
  }, [albumsSearch]);

  // Função para carregar a lista inicial de álbuns
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

  // Função para remover um álbum
  const handleRemoveAlbum = useCallback(async (albumIdToRemove: number) => {
    try {
      // Realize a chamada à API para remover o álbum com o ID albumIdToRemove
      await api.delete(`/album/${albumIdToRemove}`, {
        headers: {
          Authorization: `matheussandi@hotmail.com`,
        },
      });

      // Atualize a lista de álbuns após a remoção
      setAlbums((prevAlbums) =>
        prevAlbums.filter((album) => album.id !== albumIdToRemove)
      );
    } catch (error) {
      console.error("Erro ao remover álbum:", error);
    }
  }, []);

  // Função para remover uma faixa
  const handleRemoveTrack = useCallback(async (trackIdToRemove: number) => {
    try {
      // Realize a chamada à API para remover a faixa com o ID trackIdToRemove
      await api.delete(`/track/${trackIdToRemove}`, {
        headers: {
          Authorization: `matheussandi@hotmail.com`,
        },
      });

      // Atualize a lista de faixas após a remoção
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

  // Efeito colateral que é executado quando a string de busca ou as funções de busca/carregamento mudam
  useEffect(() => {
    // Verifica se a busca será realizada (se a string tiver mais de 2 caracteres)
    const isSearch = albumsSearch.length >= 2;

    if (isSearch) {
      // Se a busca será realizada, chama a função de busca de álbuns
      handleSearchAlbums();
    } else {
      // Caso contrário, carrega a lista padrão de álbuns
      handleAlbumsListDefault();
    }
  }, [albumsSearch, handleAlbumsListDefault, handleSearchAlbums]);

  // Função para remover o álbum ou faixa após a confirmação
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

  // Função para abrir o modal de confirmação
  const openModal = (type: "album" | "track", id: number, name: string) => {
    setItemToRemove({ type, id });
    setItemName(name); // Armazena o nome do álbum ou faixa a ser excluído
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
            <p className="mb-2 text-gray-500">Digite uma palavra chave</p>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar álbum"
                value={albumsSearch}
                onChange={(e) => setAlbumsSearch(e.target.value)}
                className="w-full rounded-lg border border-gray-300 p-2 pr-8 focus:border-primary focus:outline-none"
              />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-blue-600">
                <MdSearch size={26} />
              </div>
            </div>

            <div className="flex justify-around mt-5 text-white">
              <Link
                href={"/album"}
                className="bg-blue-600 p-4 rounded hover:bg-blue-500 transition ease-in-out"
              >
                Adicionar Álbum
              </Link>
              <Link
                href={"/track"}
                className="bg-blue-600 p-4 rounded hover:bg-blue-500 transition ease-in-out"
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
                  {/* Ícone de remoção do álbum */}
                  <MdDelete
                    color="red"
                    size={26}
                    onClick={() => openModal("album", album.id, album.name)} // Passa o nome do álbum para o modal
                    className="cursor-pointer"
                  />
                </div>
                <ul className="mt-2">
                  <li className="flex justify-between">
                    <span>N°</span>
                    <span>Faixa</span>
                    <span>Duração</span>
                    <span>Remover</span>
                  </li>
                  {album.tracks.map((track) => (
                    <li key={track.id} className="flex justify-between">
                      <span>{track.number}</span>
                      <span>{track.title}</span>
                      <span>{formatDurationToMinutes(track.duration)}</span>
                      <span>
                        {/* Ícone de remoção da faixa */}
                        <MdClose
                          color="red"
                          size={26}
                          onClick={() =>
                            openModal("track", track.id, track.title)
                          } // Passa o nome da faixa para o modal
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
      {/* Modal de confirmação */}
      <ConfirmationModal
        isOpen={showModal}
        onClose={closeModal}
        onConfirm={handleConfirmRemoval}
        itemName={itemName}
      />
    </div>
  );
}
