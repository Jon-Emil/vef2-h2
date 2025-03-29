"use client";

import { QuestionsApi } from "@/api";
import { GenericGenre, Paginated, UiState } from "@/types";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Genre from "../Genre/Genre";

export default function Genres() {
  const [uiState, setUiState] = useState<UiState>("initial");
  const [genres, setGenres] = useState<Paginated<GenericGenre> | null>(null);

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";

  useEffect(() => {
    async function fetchData() {
      setUiState("loading");

      const api = new QuestionsApi();
      const genreResponse = await api.getGenres(parseInt(page));

      if (!genreResponse) {
        setUiState("error");
      } else {
        setUiState("data");
        setGenres(genreResponse);
      }
    }
    fetchData();
  }, [page]);

  return (
    <div>
      <h2>All genres</h2>

      {uiState === "loading" && <p>Sæki genres</p>}
      {uiState === "error" && <p>Villa við að sækja genres</p>}
      {uiState === "data" && (
        <ul>
          {genres?.data.map((genre, id) => (
            <li key={id}>
              <Genre genre={genre.name} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
