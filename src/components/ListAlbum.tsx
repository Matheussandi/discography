"use client";

import { getAlbums } from "@/services/get-albums";
import { formatDurationToMinutes } from "@/utils/formatDurationToMinutes";
import { useState } from "react";
import { SearchAlbum } from "./SearchAlbum";

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

interface ListAlbumProps {
  albums: AlbumsProps;
  filteredAlbums: AlbumsProps["data"];
}

export async function ListAlbum() {
  const albums: AlbumsProps = await getAlbums();

  return (
    <div className="bg-white bg-opacity-80 px-5 py-2">
      <ul className="list-disc list-inside mt-4">
        {albums.data.map((album) => (
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
        ))}
      </ul>
    </div>
  );
}
