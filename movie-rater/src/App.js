import React, { useState, useEffect } from 'react';
import './App.css';

import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';

function App() {

  const [movies, setMovie] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [editedMovie, setEditedMovie] = useState(null);


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
    setSelectedMovie(newMovies);
  }


  useEffect(
      () => {
        fetch("http://127.0.0.1:8000/api/movies/", {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token d95b85db6a50b0c80811d15b5d5f47584efb2a48'
          }
        })
        .then( resp => resp.json())
        .then( resp => setMovie(resp))
        .catch( error => console.log(error))
      }, [])

  return (
    <div className="App">
      <header className="App-header">
      <h1>Movie Rater</h1>
      </header>
      
      <div className="layout">
        <div>
          <MovieList movies = {movies} movieClicked={movieClicked} editClicked={editClicked}/>
          <button onClick={newMovie}>New movie</button>
        </div>
          <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>

          {editedMovie ? <MovieForm movie={editedMovie} updatedMovie={updatedMovie} movieCreated={movieCreated}/> : null}
        </div>
      </div>
  );
}

export default App;
