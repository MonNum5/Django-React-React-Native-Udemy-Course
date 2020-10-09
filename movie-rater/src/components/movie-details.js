import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { useCookies } from 'react-cookie'

function MovieDetails(props){
	
  const [token] = useCookies(['mr-token']);

	const movieClicked = (movie) => (evt) => {
		props.movieClicked(movie)
	}

  const [highlighted, sethighlighted] = useState(-1);

  const highlightRate = high => evt => {
    sethighlighted(high);
  }

  const rateClicked = rate => evt => {
        fetch(`${process.env.REACT_APP_API_URL}/api/movies/${props.movie.id}/rate_movie/`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['mr-token']}`,          },
          body: JSON.stringify( {stars: rate+1} )
        })
        .then( resp => resp.json())
        .then( resp => getDetails())
        .catch( error => console.log(error))
      }

    const getDetails = () => {
      fetch(`${process.env.REACT_APP_API_URL}/${props.movie.id}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token['mr-token']}`,
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