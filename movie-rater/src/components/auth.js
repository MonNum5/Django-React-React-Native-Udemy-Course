import React, {useState, useContext, useEffect} from 'react'
import { API } from '../api-service'
import { TokenContext } from '../index'
import { useCookies } from 'react-cookie'

function Auth(){

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoginView, setIsLoginView] = useState(true)
	const [token, setToken] = useCookies(['mr-token']);

	const loginClicked = () => {
		API.loginUser({username, password})
		.then( resp => setToken('mr-token', resp.token))
		.catch( error => console.log(error))
	}

	const registerClicked = () => {
		API.registerUser({username, password})
		.then( () => loginClicked({username, password}))
		.catch( error => console.log(error))
	}

	useEffect( () => {
		if (token['mr-token']) window.location.href = '/movies';
	}, [token])

	const isDisabled = username.length === 0 || password.length === 0;

	return(
		<div className="App">
			<header className="App-header">
		      {isLoginView ? <h1>Login</h1> : <h1>Register</h1>}		
		    </header>
			<div className="login-container">
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
				{
					isLoginView ? <h1><button onClick={ evt => loginClicked()} disabled = {isDisabled}>Login</button></h1>
					: <button onClick={ evt => registerClicked()}>Register</button>
				}	
				{ isLoginView ? <p onClick={() => setIsLoginView(false)} disabled = {isDisabled}> Yout don't have an account? Register here! </p>
				: <p onClick={() => setIsLoginView(true)}> Yout already have an account? Login here! </p>}	
				
			</div>
			</div>
		)

}

export default Auth;