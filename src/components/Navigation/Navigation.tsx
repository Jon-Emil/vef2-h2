import Link from "next/link";

import styles from './Navigation.module.css'

export default function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li><Link href="/">Forsíða</Link></li>
        <li><Link href="/genres?page=1">Genres</Link></li>
        <li><Link href="/movies?page=1">Movies</Link></li>
        <li><Link href="/login">Log in</Link></li>
      </ul>
    </nav>
  );
}