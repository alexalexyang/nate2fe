export interface MovieProps {
  id: string;
  original_title: string;
  title: string;
  release_date: string;
  production_countries: string[];
  poster_path: string;
  trailer: string;
  overview: string;
  trailerType: string;
}

export interface MoviePopularity {
  tmdb_id: string;
  title: string;
  likes: number;
}
