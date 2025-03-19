import {
  GenericGenre,
  GenericMovie,
  GenreWithMovies,
  Paginated,
  PaginatedGenre,
} from "./types";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:8000";

export class QuestionsApi {
  async fetchFromApi<T>(url: string): Promise<T | null> {
    let response: Response | undefined;
    try {
      response = await fetch(url);
    } catch (e) {
      console.error("error fetching from api", url, e);
      return null;
    }

    if (!response.ok) {
      console.error("non 2xx status from API", url);
      return null;
    }

    let json: unknown;
    try {
      json = await response.json();
    } catch (e) {
      console.error("error parsing json", url, e);
      return null;
    }

    return json as T;
  }

  async getGenres(page: number): Promise<Paginated<GenericGenre> | null> {
    const url = BASE_URL + `/genres?offset=${page - 1}`;

    const response = await this.fetchFromApi<Paginated<GenericGenre>>(url);

    // TODO hér gæti ég staðfest gerð gagna

    return response;
  }

  async getMoviesForGenre(
    page: number,
    genre_id: number
  ): Promise<PaginatedGenre | null> {
    const url = BASE_URL + `/movies/genres/${genre_id}?offset=${page - 1}`;

    let response = await this.fetchFromApi<PaginatedGenre>(url);

    // TODO hér gæti ég staðfest gerð gagna

    return response;
  }

  async getMovies(page: number): Promise<Paginated<GenericMovie> | null> {
    console.log(page);
    const url = BASE_URL + `/movies?offset=${page - 1}`;

    const response = await this.fetchFromApi<Paginated<GenericMovie>>(url);

    // TODO hér gæti ég staðfest gerð gagna

    return response;
  }
}
