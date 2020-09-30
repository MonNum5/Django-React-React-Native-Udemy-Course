import React , { useState, useEffect } from 'react';
import { API } from '../api-service';

function MovieForm(props) {

	const [ title, setTitle ] = useState('')
	const [ description, setDescription ] = useState('')

	useEffect( () => {
		setTitle(props.movie.title)
		setDescription(props.movie.description)
	}, [props.movie])

	const updateClicked = () => {
		API.updateMovie(props.movie.id, {title, description})
		.then( resp => props.updatedMovie(resp))
		.catch(error => console.log(error))
	}

	const createClicked = () => {
		API.createMovie({title, description})
		.then( resp => props.movieCreated(resp))
		.catch(error => console.log(error))

	}
	return (
		<React.Fragment>
		{ props.movie ?(
			<div>
			<label id="title" htmlFor ="title"> Title </label>
			<br/>
			<input id="title" type="text" palceholder="title" value={title}
			onChange={evt => setTitle(evt.target.value)}/>
			<br/>
			<label htmlFor="description" >Description</label>
			<br/>
			<textarea type="text" id="description" palceholder="Description" value={description}
			onChange={evt => setDescription(evt.target.value)}/>
			<br/>
			{ props.movie.id ? 
			<button onClick={ evt => updateClicked()}>Update</button> :
			<button onClick={ evt => createClicked()}>Create</button> 
				}	
			</div>
		) : null}


		</React.Fragment>
		)
}

export default MovieForm;

