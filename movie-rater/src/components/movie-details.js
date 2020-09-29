import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function MovieDetails(props){
	
	const movieClicked = (movie) => (evt) => {
		props.movieClicked(movie)
	}

  const [highlighted, sethighlighted] = useState(-1);

  const highlightRate = high => evt => {
    sethighlighted(high);
  }

  const rateClicked = rate => evt => {
        fetch(`http://127.0.0.1:8000/api/movies/${props.movie.id}/rate_movie/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token d95b85db6a50b0c80811d15b5d5f47584efb2a48'
          },
          body: JSON.stringify( {stars: rate+1} )
        })
        .then( resp => resp.json())
        .then( resp => getDetails())
        .catch( error => console.log(error))
      }

    const getDetails = () => {
      fetch(`http://127.0.0.1:8000/api/movies/${props.movie.id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token d95b85db6a50b0c80811d15b5d5f47584efb2a48'
          },
        })
        .then( resp => resp.json())
        .then( resp => props.updateMovie(resp))
        .catch( error => console.log(error))
    }

	return(
		<div>
      { props.movie ? (
        <div>
          <h1>{props.movie.title}</h1>
          <p>{props.movie.description}</p> 
          <div>
          <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 0 ? "orange":''}/>
          <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 1 ? "orange":''}/>
          <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 2 ? "orange":''}/>
          <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 3 ? "orange":''}/>
          <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 4 ? "orange":''}/>
          ({props.movie.no_of_ratings})
        </div>
        <div className="rate-container">
            <h2>Rate it</h2> 
              { [...Array(5)].map( (e, i)=> {
                return (<FontAwesomeIcon key={i} icon={faStar} className={highlighted > i-1 ? "purple":''}
                  onMouseEnter={highlightRate(i)}
                  onMouseLeave={highlightRate(-1)}
                  onClick={rateClicked(i)}
                  />)
              }
                )}
        </div>  
        </div>
      ) : null}   

       
    </div>
		)
}

export default MovieDetails;