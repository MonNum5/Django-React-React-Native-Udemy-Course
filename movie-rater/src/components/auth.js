import React, {useState, useContext, useEffect} from 'react'
import { API } from '../api-service'
import { TokenContext } from '../index'
import { useCookies } from 'react-cookie'

function Auth(){

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [token, setToken] = useCookies(['mr-token']);

	const loginClicked = () => {
		API.loginUser({username, password})
		.then( resp => setToken('mr-token', resp.token))
		.catch( error => console.log(error))
	}

	useEffect( () => {
		if (token['mr-token']) window.location.href = '/movies';
	}, [token])

	return(
		<div>
			<label id="username" htmlFor ="username"> Username </label>
			<br/>
			<input id="username" type="text" palceholder="username" value={username}
			onChange={evt => setUsername(evt.target.value)}/>
			<br/>
			<label htmlFor="password" >Password</label>
			<br/>
			<input type="password" id="password" palceholder="Password" value={password}
			onChange={evt => setPassword(evt.target.value)}/>
			<br/>
			<button onClick={ evt => loginClicked()}>Login</button>
			</div>
		)

}

export default Auth;