'use client';

import { QuestionsApi } from '@/api';
import {GenericGenre, MovieFormData, Paginated, UiState } from '@/types';
import { useEffect, useState } from 'react';
import styles from './MovieForm.module.css'

export default function Form() {
  const [uiState, setUiState] = useState<UiState>('empty');
  const [genres, setGenres] = useState<Paginated<GenericGenre>>({data: [], total: 0, limit: 10, offset: 0})
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [movieTitle, setMovieTitle] = useState<string>("")
  const [movieYear, setMovieYear] = useState<string>("")
  const [director, setDirector] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [imageFile, setImageFile] = useState<File | null>(null)

  useEffect(() => {
    async function fetchGenres() {
        setUiState('empty');
  
        const api = new QuestionsApi();
        const genreResponse = await api.getAllGenres();
  
        if (!genreResponse) {
          setUiState('error');
        } else {
          setUiState('data');
          setGenres(genreResponse);
        }
      }
      fetchGenres();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!imageFile) {
        alert("Please choose a photo!");
        return;
    }
    if (!movieYear) {
        alert("Please select a year!");
        return;
    }

    const movieInfo: MovieFormData = {
        title: movieTitle,
        year: movieYear,
        director: director,
        image: imageFile,
        description: description,
        genres: selectedGenres
    }

    console.log("Sel genres ", selectedGenres)

    setUiState('loading');

    const api = new QuestionsApi();
    const response = await api.createMovie(movieInfo);

    if(typeof response === 'string'){
        alert(response)
        setUiState('error')
    }
    if(!response){
        setUiState('error');
    }else {
        setUiState('created')
        setMovieTitle('');
        setDirector('');
        setSelectedGenres([]);
        setDescription("");
        setImageFile(null);
      }
  };


  return (
    <form onSubmit={handleSubmit} className={styles.form}>
        {uiState === 'empty' && <p>Sækir upplýsingar</p>}
        {uiState === 'loading' && <p>býr til myndina</p>}
        {uiState === 'error' && <p>Villa við að bæta mynd við!</p>}
        {uiState === 'created' && (
            <>
            <h2>Mynd hefur verið bætt við</h2>
            <p>Skoðaðu hana með því að velja movies í navigation barinu</p>
            </>
            )}
        {uiState === 'data' && (
            <>
            <label className={styles.labelForField}>
                Title:
                <input type="text" 
                required
                value={movieTitle} 
                onChange={(e) => setMovieTitle(e.target.value)} />
            </label>

            <label className={styles.labelForField}>
                Year:
                <input type="text" 
                value={movieYear} 
                required
                onChange={(e) => setMovieYear(e.target.value)} 
                />
            </label>

            <label className={styles.labelForField}>
                Director:
                <input type="text" 
                value={director} 
                required
                onChange={(e) => setDirector(e.target.value)} />
            </label>

            <label className={styles.labelForField}>Genres:
                <div>
                    {genres.data.map((genre) => (
                        <label key={genre.id} className={styles.labelForField}>
                            <input 
                                type="checkbox" 
                                value={genre.name} 
                                className={styles.checkbox_input}
                                checked={selectedGenres.includes(genre.name)}
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedGenres([...selectedGenres, genre.name]);
                                    } else {
                                        setSelectedGenres(selectedGenres.filter(g => g !== genre.name));
                                    }
                                }}
                            />
                            {genre.name}
                        </label>
                    ))}
                </div>
            </label>

            <label className={styles.labelForField}>
                Movie description:
                <input type="text" 
                value={description} 
                required
                onChange={(e) => setDescription(e.target.value)} />
            </label>

            <label className={styles.labelForField}>
                Photo:
                <input type="file" 
                className={styles.file_input}
                accept="image/jpeg, image/png" 
                required
                onChange={(e) => {
                    if (e.target.files) {
                    setImageFile(e.target.files[0]);
                    }
                }} />
            </label>

            <button type='submit' className={styles.button}>Create movie!</button>
            </>
        )}
    </form>
  );
}
