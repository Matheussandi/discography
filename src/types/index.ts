export interface AlbumProps {
  id: number;
  name: string;
  year: number;
  tracks: TrackProps[];
}

export interface TrackProps {
  id: number;
  number: number;
  title: string;
  duration: number;
}

export interface AlbumDataProps {
  name: string;
  year: string;
}