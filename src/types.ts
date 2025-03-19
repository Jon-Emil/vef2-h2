export type UiState = "initial" | "loading" | "error" | "data" | "empty";

export type GenericGenre = {
  id: string;
  name: string;
};

export type GenericMovie = {
  id: string;
  title: string;
  year: number;
  director: string;
  img_url: string;
  description: string;
  slug: string;
  genres: string[];
};

export type GenreWithMovies = {
  id: string;
  name: string;
  movies: GenericMovie[];
};

export type MovieWithRating = {
  id: string;
  title: string;
  year: number;
  director: string;
  img_url: string;
  description: string;
  slug: string;
  genres: string[];
  user_rating: number;
  user_status: string;
};

export type PaginatedGenre = {
  data: GenreWithMovies;
  total: number;
  limit: number;
  offset: number;
};

export type Paginated<T> = {
  data: T[];
  total: number;
  limit: number;
  offset: number;
};
