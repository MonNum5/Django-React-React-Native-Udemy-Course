import React, {useState, useContext} from 'react'
import { API } from '../api-service'
import { TokenContext } from '../index'

function Auth(){

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const [token, setToken] = useContext(TokenContext);

	const loginClicked = () => {
		API.loginUser({username, password})
		.then( resp => setToken.log(resp.token))
		.catch( error => console.log(error))
	}
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