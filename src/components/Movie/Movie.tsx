/* eslint-disable @next/next/no-img-element */
"use client";

import { GenericMovie } from "@/types";
import styles from "./Movie.module.css";
import Genre from "../Genre/Genre";
import Link from "next/link";

export default function Movie({ movie }: { movie: GenericMovie }) {
  return (
    <div className={styles.movie}>
      <Link href={`/movies/${movie.slug}`}>
        <img
          src={movie.img_url}
          alt={`movie poster for the movie: ${movie.title}`}
        />
      </Link>
      <div className={styles.movieInfo}>
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
  );
}
