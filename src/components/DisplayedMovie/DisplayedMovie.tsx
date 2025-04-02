/* eslint-disable @next/next/no-img-element */
"use client";

import { QuestionsApi } from "@/api";
import { GenericMovie, UiState } from "@/types";
import { useEffect, useState } from "react";
import Genre from "../Genre/Genre";
import styles from "./DisplayedMovie.module.css";
import NotFound from "../NotFound/NotFound";

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
  }, [movieSlug]);

  return (
    <div>
      {uiState === "loading" && <p>Sæki mynd</p>}
      {uiState === "error" && <NotFound/>}
      {uiState === "data" && movie && (
      <div className={styles.movie_container}>
        <img
          src={movie.img_url}
          className={styles.movie_poster}
          alt={`Movie poster for the movie: ${movie.title}`}
        />
        <div className={styles.movie_details}>
          <h2 className={styles.movie_title}>{movie.title}</h2>
          <p className={styles.movie_year}>({movie.year})</p>
          <p className={styles.movie_director}>Directed by: {movie.director}</p>
          <div className={styles.movie_description}>
            <h3>Description:</h3>
            <p>{movie.description}</p>
          </div>
          <ul className={styles.movie_genres}>
            {movie.genres.map((genre, index) => (
              <li key={index}>
                <Genre genre={genre} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      )}</div>
  );

}
