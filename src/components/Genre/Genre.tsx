"use client";

import { QuestionsApi } from "@/api";
import { GenericGenre, UiState } from "@/types";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Genre.module.css";

export default function Genres({ genre }: { genre: string }) {
  const [uiState, setUiState] = useState<UiState>("initial");
  const [movieAmount, setMovieAmount] = useState<number>(0);
  const [genreItem, setGenreItem] = useState<GenericGenre | null>(null);

  useEffect(() => {
    async function fetchData() {
      setUiState("loading");

      const api = new QuestionsApi();
      const allGenres = await api.getAllGenres();
      if (!allGenres) {
        setUiState("error");
        return;
      }
      const genreItem = allGenres.data.find(
        (genreItem) => genreItem.name === genre
      );
      if (!genreItem) {
        setUiState("error");
        return;
      }
      const genreResponse = await api.getAllMoviesForGenre(genreItem.id);

      if (!genreResponse) {
        setUiState("error");
      } else {
        setUiState("data");
        const amountOfMovies = genreResponse.data.movies.length;
        setGenreItem(genreItem);
        setMovieAmount(amountOfMovies);
      }
    }
    fetchData();
  }, [genre]);

  return genreItem ? (
    <Link
      className={styles.genre}
      href={`/genres/${genre.replace(/ /g, "-").toLowerCase()}`}
    >
      {uiState === "loading" && (
        <div className={styles.movieAmount}>
          <div className={styles.loader}></div>
        </div>
      )}
      {uiState === "error" && <p className={styles.movieAmount}>?</p>}
      {uiState === "data" && (
        <p className={styles.movieAmount}>{movieAmount}</p>
      )}
      <p className={styles.genreName}>{genreItem.name}</p>
    </Link>
  ) : (
    <Link
      className={styles.genre}
      href={`/genres/${genre.replace(/ /g, "-").toLowerCase()}`}
    >
      <div className={styles.movieAmount}>
        <div className={styles.loader}></div>
      </div>
      <p className={styles.genreName}>{genre}</p>
    </Link>
  );
}
