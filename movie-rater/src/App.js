import React, { useState, useEffect } from 'react';
import './App.css';

import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';

function App() {


  const [movies, setMovie] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [editedMovie, setEditedMovie] = useState(null);

  const [token] = useCookies(['mr-token']);

  useEffect( () => {
    if (!token['mr-token']) window.location.href = '/movies';
  }, [token])

  const movieClicked = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  }

  const loadMovie = (movie) => {
    setSelectedMovie(movie);
  }

  const editClicked = (movie) => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  }

  const updatedMovie = (movie) => {
    const newMovies = movies.map(mov =>{
      if ( mov.id === movie.id ) {
        return movie;
      } else {
        return mov;
      }

    })
    setMovie(newMovies);
  }

  const newMovie = () => {
    setEditedMovie({title:'','description':''})
    setSelectedMovie(null);
  }

  const movieCreated = (movie) => {
    const newMovies = [...movies, movie]
    console.log(newMovies)
    setMovie(newMovies);
  }

  const removeClicked = (movie) => {
    const newMovies = movies.filter( mov => mov.id !== movie.id);
    setMovie(newMovies);
    
    }
    

  useEffect(
      () => {
        fetch("http://127.0.0.1:8000/api/movies/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['mr-token']}`,
          }
        })
        .then( resp => resp.json())
        .then( resp => setMovie(resp))
        .catch( error => console.log(error))
      }, [])


  return (
    <div className="App">
      <header className="App-header">
      <h1>
      <FontAwesomeIcon icon={faFilm}/>
      <span>Movie Rater</span></h1>
      </header>
      
      <div className="layout">
        <div>
          <MovieList movies = {movies}
           movieClicked={movieClicked}
            editClicked={editClicked}
            removeClicked={removeClicked}/>
          <button onClick={newMovie}>New movie</button>
        </div>
          <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>

          {editedMovie ? <MovieForm movie={editedMovie} updatedMovie={updatedMovie} movieCreated={movieCreated}/> : null}
        </div>
      </div>
  );
}

export default App;
