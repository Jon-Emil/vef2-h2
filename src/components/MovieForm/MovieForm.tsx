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
    <div className={styles.movie_form}>
        <form onSubmit={handleSubmit}>
            {uiState === 'empty' && <p>Sækir upplýsingar</p>}
            {uiState === 'loading' && <p>býr til myndina</p>}
            {uiState === 'error' && <p>Villa við að bæta mynd við!</p>}
            {uiState === 'created' && (
                <div className={styles.created}>
                    <h2>Mynd hefur verið bætt við</h2>
                    <p>Skoðaðu hana með því að velja movies í navigation barinu</p>
                </div>
                )}
            {uiState === 'data' && (
                <>
                    <div className={styles.heading_container}>
                        <h1>Create a new movie!</h1>
                    </div>

                    <div className={styles.field_container}>
                        <input type="text" 
                        required
                        placeholder='Title'
                        value={movieTitle} 
                        onChange={(e) => setMovieTitle(e.target.value)}
                        className={styles.user_inp_title} 
                        />
                    </div>

                    
                    <div className={styles.field_container}>
                        <input type="text" 
                        value={movieYear} 
                        placeholder='Year'
                        required
                        onChange={(e) => setMovieYear(e.target.value)}
                        className={styles.user_inp_year} 
                        />
                    </div>

                    <div className={styles.field_container}>
                        <input type="text" 
                        placeholder='Director'
                        value={director} 
                        required
                        onChange={(e) => setDirector(e.target.value)}
                        className={styles.user_inp_director} 
                        />
                    </div>

                    <div className={styles.field_container}>
                        <input type="text" 
                        value={description} 
                        placeholder='Description'
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        className={styles.user_inp_desc} 
                        />
                    </div>

                    <div className={styles.field_container}>
                        <div className={styles.middle_text}>
                            <p>Genres: </p>
                        </div>
                    </div>
                    <div className={styles.field_container}>
                        <div className={styles.genres_list}>
                            {genres.data.map((genre) => (
                                <label key={genre.id} >
                                    <input 
                                        type="checkbox"
                                        value={genre.name} 
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
                    </div>

                    <div className={styles.field_container}>
                        <div className={styles.middle_text}>
                            <p>Image: </p>
                        </div>
                    </div>
                    <div className={styles.field_container}>
                        <input 
                            type="file" 
                            id="fileUpload"
                            className={styles.file_input}
                            accept="image/jpeg, image/png" 
                            required
                            onChange={(e) => {
                                if (e.target.files) {
                                    setImageFile(e.target.files[0]);
                                }
                            }} 
                        />
                        <label htmlFor="fileUpload" className={styles.file_label}>
                            📁 Choose a file
                        </label>

                        {imageFile && <p className={styles.file_name}><strong>File chosen </strong> &gt; {imageFile.name}</p>}
                    </div>

                    <div className={styles.field_container}>
                        <button type='submit' className={styles.submit_button}>Create movie!</button>
                    </div>
                </>
            )}
        </form>
    </div>
  );
}
