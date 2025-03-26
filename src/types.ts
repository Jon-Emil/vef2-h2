export type UiState = "initial" | "loading" | "error" | "data" | "empty";

export type GenericGenre = {
  id: number;
  name: string;
};

export type GenericMovie = {
  id: number;
  title: string;
  year: number;
  director: string;
  img_url: string;
  description: string;
  slug: string;
  genres: string[];
};

export type GenreWithMovies = {
  id: number;
  name: string;
  movies: GenericMovie[];
};

export type MovieWithRating = {
  id: number;
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

export type UserInfo = {
  username: string;
  password: string;
};

export type User = {
  id: number;
  username: string;
  password: string;
  admin: boolean;
};

export type tokenReturn = {
  message: string;
  token: string;
};
