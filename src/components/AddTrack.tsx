"use client";

import { api } from "@/lib/api";
import { useEffect, useState } from "react";

interface Album {
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

export function AddTrack() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [albumId, setAlbumId] = useState("");
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const response = await api.get("/album", {
          headers: {
            Authorization: "matheussandi@hotmail.com",
          },
        });

        if (response.status === 200) {
          setAlbums(response.data.data); // Armazena os álbuns no estado 'albums'
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

    // Substitua '<token>' pelo seu token de autenticação
    const token = "matheussandi@hotmail.com";
    const url = "https://tiao.supliu.com.br/api/track";

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Faixa adicionada com sucesso!");
        // Aqui você pode redirecionar para outra página ou realizar outras ações após o sucesso
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
          Duração (segundos)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="duration"
          type="number"
          placeholder="Duração da faixa (segundos)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Adicionar Faixa
        </button>
      </div>
    </form>
  );
}
