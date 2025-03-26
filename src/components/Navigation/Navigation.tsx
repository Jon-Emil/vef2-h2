'use client';

import Link from "next/link";
import styles from './Navigation.module.css'
import { useEffect, useState } from "react";
import { UiState, User } from "@/types";
import { QuestionsApi } from "@/api";

export default function Navigation() {

  const [uiState, setUiState] = useState<UiState>('initial');
    const [user, setUser] = useState<User | null>(
      null,
    );
    
  useEffect(() => {
      async function fetchData() {
        setUiState('loading');
  
        const api = new QuestionsApi();
        const userResponse = await api.getUser();
  
        if (!userResponse) {
          setUiState('error');
        } else {
          setUiState('data');
          setUser(userResponse);
        }
      }
      fetchData();
    }, []);
  
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.nav_item}><Link href="/">Forsíða</Link></li>
        <li className={styles.nav_item}><Link href="/genres?page=1">Genres</Link></li>
        <li className={styles.nav_item}><Link href="/movies?page=1">Movies</Link></li>
        <li className={styles.nav_item}><Link href="/login">Log in</Link></li>
        <li className={styles.nav_item}><Link href="/movieform">Bæta við mynd</Link></li>
        {uiState === 'loading' && <li className={styles.user_info}>Sæki notanda</li>}
        {uiState === 'error' && <li className={styles.user_info}>User not found</li>}
        {uiState === 'data' && (
          user ? <li className={styles.user_info}>{user.username}</li> : <li className={styles.user_info}>Not logged in</li>
        )}
      </ul>
    </nav>
  );
}