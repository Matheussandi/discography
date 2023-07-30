"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { api } from "@/lib/api";

import { AlbumProps } from "@/types";
import { formatDurationToMinutes } from "@/utils/formatDurationToMinutes";
import Link from "next/link";

export function AddTrack() {
  const [albums, setAlbums] = useState<AlbumProps[]>([]);
  const [albumId, setAlbumId] = useState("");
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await api.get("/album", {
          headers: {
            Authorization: "matheussandi@hotmail.com",
          },
        });

        if (response.status === 200) {
          setAlbums(response.data.data);
        } else {
          alert("Erro ao buscar álbuns.");
        }
      } catch (error) {
        alert(
          "Ocorreu um erro inesperado. Verifique a conexão com o servidor."
        );
        console.error("Erro:", error);
      }
    };

    fetchAlbums();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      album_id: parseInt(albumId),
      number: parseInt(number),
      title,
      duration: parseInt(duration),
    };

    const token = "matheussandi@hotmail.com";

    try {
      const response = await api.post("/track", data, {
        headers: {
          Authorization: token,
        },
      });

      if (response.status === 200) {
        router.push("/");
      } else {
        alert("Erro ao adicionar faixa.");
      }
    } catch (error) {
      alert("Ocorreu um erro inesperado. Verifique a conexão com o servidor.");
      console.error("Erro:", error);
    }
  };

  return (
    <form className="max-w-md mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Adicionar Faixa</h2>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="albumId"
        >
          Álbum
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="albumId"
          value={albumId}
          onChange={(e) => setAlbumId(e.target.value)}
          required
        >
          <option value="">Selecione um álbum</option>
          {albums.map((album) => (
            <option key={album.id} value={album.id}>
              {album.name}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="number"
        >
          Número
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="number"
          type="number"
          placeholder="Número da faixa"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Título
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Título da faixa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="duration"
        >
          Duração
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="duration"
          type="number"
          placeholder="Duração da faixa"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
        <div className="flex text-center justify-center mt-2">
          {duration ? (
            <p>{formatDurationToMinutes(parseInt(duration))} minutos</p>
          ) : (
            <p>0:00 minutos</p>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Link
          href="/"
          className="w-1/2 px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-500 focus:outline-none flex items-center justify-center"
        >
          Cancelar
        </Link>
        <button
          type="submit"
          className="w-1/2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none"
        >
          Adicionar
        </button>
      </div>
    </form>
  );
}
