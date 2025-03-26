import {
  GenericGenre,
  GenericMovie,
  MovieFormData,
  Paginated,
  PaginatedGenre,
  tokenReturn,
  User,
  UserInfo,
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

  async getAllGenres(): Promise<Paginated<GenericGenre> | null> {
    const url = BASE_URL + `/genres?limit=99999`;

    const response = await this.fetchFromApi<Paginated<GenericGenre>>(url);

    // TODO hér gæti ég staðfest gerð gagna

    return response;
  }

  async getMoviesForGenre(
    page: number,
    genre_id: number,
    limit: number = 10
  ): Promise<PaginatedGenre | null> {
    const url =
      BASE_URL + `/movies/genres/${genre_id}?offset=${page - 1}&limit=${limit}`;

    const response = await this.fetchFromApi<PaginatedGenre>(url);

    // TODO hér gæti ég staðfest gerð gagna

    return response;
  }

  async getAllMoviesForGenre(genre_id: number): Promise<PaginatedGenre | null> {
    const url = BASE_URL + `/movies/genres/${genre_id}?limit=99999`;

    const response = await this.fetchFromApi<PaginatedGenre>(url);

    // TODO hér gæti ég staðfest gerð gagna

    return response;
  }

  async getMovies(
    page: number,
    limit: number = 10
  ): Promise<Paginated<GenericMovie> | null> {
    console.log(page);
    const url = BASE_URL + `/movies?offset=${page - 1}&limit=${limit}`;

    const response = await this.fetchFromApi<Paginated<GenericMovie>>(url);

    // TODO hér gæti ég staðfest gerð gagna

    return response;
  }

  async logUserIn(user: UserInfo): Promise<tokenReturn | string> {
    console.log("user data: ", user);
    const url = BASE_URL + "/users/log_in";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.status === 400) {
      //túlka villuna sem json þar sem API skilar json villum fyrir 400 status
      const errorResponse = await response.json();

      const errorMessage = errorResponse.error || "Unknown error occurred";
      const fieldErrors = errorResponse.errors?.fieldErrors || {};

      //Túlka allar fieldError villur til að birta allt sem var að
      for (const field in fieldErrors) {
        if (fieldErrors[field].length > 0) {
          console.error(`${field}: ${fieldErrors[field].join(", ")}`);
        }
      }
      //skila streng af villum.
      return `${errorMessage}: ${JSON.stringify(fieldErrors)}`;
    }

    if (response.status === 404) {
      return "User not found";
    }

    if (!response.ok) {
      return "Failed to log user in " + response.statusText;
    }

    return await response.json();
  }

  async getUser(): Promise<User | null> {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) => row.startsWith("auth="));
    const token = tokenCookie ? tokenCookie.split("=")[1] : null;

    if (!token) {
      console.log("invalid token");
      return null;
    }

    const url = BASE_URL + "/user";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.log("an error came up when fetching user");
      return null;
    }

    const data = await response.json();
    console.log("User data:", data);

    return data;
  }

  async createMovie(movieData: MovieFormData) {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((row) => row.startsWith("auth="));
    const token = tokenCookie ? tokenCookie.split("=")[1] : null;

    if (!token) {
      console.log("invalid token");
      return null;
    }

    const url = BASE_URL + "/movies";

    const formData = new FormData();
    formData.append("title", movieData.title);
    formData.append("year", movieData.year.toString());
    formData.append("director", movieData.director);
    formData.append("description", movieData.description);
    formData.append("image", movieData.image);
    formData.append("genres", JSON.stringify(movieData.genres));

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    console.log(response);

    if (response.status === 401 || response.status === 403) {
      return "current user does not have permission to create movie, only admin can do that. If you are the admin, please log in/log in again";
    }

    if (response.status === 400) {
      //túlka villuna sem json þar sem API skilar json villum fyrir 400 status
      const errorResponse = await response.json();
      console.log(errorResponse);

      const errorMessage =
        errorResponse.error ||
        errorResponse.message ||
        "Unknown error occurred";
      const fieldErrors = errorResponse.errors?.fieldErrors || {};

      //Túlka allar fieldError villur til að birta allt sem var að
      for (const field in fieldErrors) {
        if (fieldErrors[field].length > 0) {
          console.error(`${field}: ${fieldErrors[field].join(", ")}`);
        }
      }
      //skila streng af villum.
      return `${errorMessage}: ${JSON.stringify(fieldErrors)}`;
    }

    if (!response.ok) {
      return "Failed to create movie" + response.statusText;
    }

    return await response.json();
  }
}
