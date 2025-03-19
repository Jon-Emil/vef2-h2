import { GenericGenre, Paginated } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:8000';

export class QuestionsApi {
  async fetchFromApi<T>(url: string): Promise<T | null> {
    let response: Response | undefined;
    try {
      response = await fetch(url);
    } catch (e) {
      console.error('error fetching from api', url, e);
      return null;
    }

    if (!response.ok) {
      console.error('non 2xx status from API', url);
      return null;
    }

    let json: unknown;
    try {
      json = await response.json();
    } catch (e) {
      console.error('error parsing json', url, e);
      return null;
    }

    return json as T;
  }

  async getGenres(page: number): Promise<Paginated<GenericGenre> | null> {
    const url = BASE_URL + `/genres?offset=${page-1}`;

    const response = await this.fetchFromApi<Paginated<GenericGenre>>(url);

    // TODO hér gæti ég staðfest gerð gagna

    return response;
  }
}
