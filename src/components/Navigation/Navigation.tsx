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
      <ul>
        <li><Link href="/">Forsíða</Link></li>
        <li><Link href="/genres?page=1">Genres</Link></li>
        <li><Link href="/movies?page=1">Movies</Link></li>
        <li><Link href="/login">Log in</Link></li>
        <li><Link href="/movieform">Bæta við mynd</Link></li>
        {uiState === 'loading' && <li>Sæki notanda</li>}
        {uiState === 'error' && <li>User not found</li>}
        {uiState === 'data' && (
          user ? <li>{user.username}</li> : <li>Not logged in</li>
        )}
      </ul>
    </nav>
  );
}