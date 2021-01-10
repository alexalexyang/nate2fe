export interface MovieType {
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

export type MoviesType = MovieType[] | null;
export interface MoviesProps {
  movie?: MovieType;
  movies?: MoviesType;
}
