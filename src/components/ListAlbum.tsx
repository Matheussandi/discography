"use client";

import { formatDurationToMinutes } from "@/utils/formatDurationToMinutes";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";

import { FiSearch } from "react-icons/fi";
import Link from "next/link";

interface AlbumProps {
  id: number;
  name: string;
  year: number;
  tracks: Track[];
}

interface Track {
  id: number;
  number: number;
  title: string;
  duration: number;
}

interface AlbumsProps {
  data: AlbumProps[];
}

export default function ListAlbum() {
  const [albums, setAlbums] = useState<AlbumProps[]>([]);
  const [albumsSearch, setAlbumsSearch] = useState("");

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
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <FiSearch color="#0079FF" size={20} />
              </div>
            </div>

            <div className="flex justify-around mt-5 space-x-2 text-white">
              <Link href={"/album"} className="bg-blue-500 p-4 rounded">
                Adicionar Album
              </Link>
              <Link href={"/track"} className="bg-blue-500 p-4 rounded">
                Adicionar Faixa
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-7 border-t border-gray-300">
          {albums.length === 0 ? (
            <p>Nenhum álbum encontrado.</p>
          ) : (
            albums.map((album) => (
              <div key={album.id}>
                <strong>
                  Álbum: {album.name}, {album.year}
                </strong>
                <ul className="mt-2">
                  <li className="flex justify-between">
                    <span>N°</span>
                    <span>Faixa</span>
                    <span>Duração</span>
                  </li>
                  {album.tracks.map((track) => (
                    <li key={track.id} className="flex justify-between">
                      <span>{track.number}</span>
                      <span>{track.title}</span>
                      <span>{formatDurationToMinutes(track.duration)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
