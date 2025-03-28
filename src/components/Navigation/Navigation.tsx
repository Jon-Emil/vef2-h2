"use client";

import Link from "next/link";
import styles from "./Navigation.module.css";
import { useEffect, useState } from "react";
import { UiState, User } from "@/types";
import { QuestionsApi } from "@/api";

export default function Navigation({ site }: { site: string }) {
  const [uiState, setUiState] = useState<UiState>("initial");
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchData() {
      setUiState("loading");

      const api = new QuestionsApi();
      const userResponse = await api.getUser();

      if (!userResponse) {
        setUiState("error");
      } else {
        setUiState("data");
        setUser(userResponse);
      }
    }
    fetchData();
  }, []);

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li
          className={`${styles.nav_item} ${site === "" ? styles.selected : ""}`}
        >
          <Link href="/">Front Page</Link>
        </li>
        <li
          className={`${styles.nav_item} ${
            site === "genres" ? styles.selected : ""
          }`}
        >
          <Link href="/genres?page=1">Genres</Link>
        </li>
        <li
          className={`${styles.nav_item} ${
            site === "movies" ? styles.selected : ""
          }`}
        >
          <Link href="/movies?page=1">Movies</Link>
        </li>
        <li
          className={`${styles.nav_item} ${
            site === "login" ? styles.selected : ""
          }`}
        >
          <Link href="/login">
            {uiState === "initial" && <p>Loading user...</p>}
            {uiState === "loading" && <p>Loading user...</p>}
            {uiState === "error" && <p>Log in</p>}
            {uiState === "data" && user && <p>{user.username}</p>}
          </Link>
        </li>
        <li
          className={`${styles.nav_item} ${
            site === "movieform" ? styles.selected : ""
          }`}
        >
          <Link href="/movieform">Bæta við mynd</Link>
        </li>
      </ul>
    </nav>
  );
}
