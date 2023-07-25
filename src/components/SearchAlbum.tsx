import { getAlbums } from "@/services/get-albums";
import { useState } from "react";

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

export function SearchAlbum({ data }: AlbumsProps) {
  const [searchTerm, setSearchTerm] = useState(""); // Estado para armazenar o termo de pesquisa

  const handleSearch = () => {
    const filteredAlbums = data.filter((album) =>
      album.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filteredAlbums;
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Pesquisar álbum por nome"
        className="border border-gray-400 p-2 mt-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button
        className="ml-2 px-4 py-2 bg-blue-500 text-white"
        onClick={handleSearch}
      >
        Pesquisar
      </button>
    </div>
  );
}
