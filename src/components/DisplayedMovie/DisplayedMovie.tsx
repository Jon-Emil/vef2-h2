"use client";

import { QuestionsApi } from "@/api";
import { GenericGenre, GenericMovie, Paginated, UiState } from "@/types";
import { useEffect, useState } from "react";
import Genre from "../Genre/Genre";
import styles from "./DisplayedMovie.module.css";

export default function Genres({ movieSlug }: { movieSlug: string }) {
  const [uiState, setUiState] = useState<UiState>("initial");
  const [movie, setMovie] = useState<GenericMovie | null>(null);

  useEffect(() => {
    async function fetchData() {
      setUiState("loading");

      const api = new QuestionsApi();
      const movieResponse = await api.getMovie(movieSlug);

      if (!movieResponse) {
        setUiState("error");
      } else {
        setUiState("data");
        setMovie(movieResponse);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {uiState === "loading" && <p>Sæki mynd</p>}
      {uiState === "error" && <p>Villa við að sækja mynd</p>}
      {uiState === "data" && movie && (
        <div>
          <img
            src={movie.img_url}
            className={styles.Image}
            alt={`movie poster for the movie: ${movie.title}`}
          />
          <div>
            <h2>{movie.title}</h2>
            <p>{`(${movie.year})`}</p>
            <ul>
              {movie.genres.map((genre, index) => (
                <li key={index}>
                  <Genre genre={genre} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
