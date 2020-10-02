import React, { useState, useEffect } from 'react';
import './App.css';

import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useFetch } from './hooks/useFetch';


function App() {


  const [movies, setMovie] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [editedMovie, setEditedMovie] = useState(null);

  const [token, setToken, deleteToken] = useCookies(['mr-token']);
  
  const [data, loading, error] = useFetch();

  useEffect( () => {
    if (!token['mr-token']) window.location.href = '/';
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
    

  useEffect( () => {
      console.log(data)
        setMovie(data)
      }, [data])

  const logoutUser = () => {
    deleteToken(['mr-token']);
    window.location.href = '/movies';
  }

  if (loading)
    return (<h1>Loading....</h1>)
  if (error)
    return (<h1> Error </h1>)

  return (
    <div className="App">
      <header className="App-header">
      <h1>
      <FontAwesomeIcon icon={faFilm}/>
      <span>Movie Rater</span></h1>
      </header>
      <FontAwesomeIcon onClick = {logoutUser}icon={faSignOutAlt}/>
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
