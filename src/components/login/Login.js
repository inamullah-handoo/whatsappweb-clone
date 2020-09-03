import React from 'react';
import { Button } from '@material-ui/core';

import './login.css';
import { auth, provider } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import { actionTypes } from '../../reducer';

const Login = () => {
	const [{}, dispatch] = useStateValue();

	const signIn = () => {
		auth.signInWithPopup(provider)
			.then((result) => {
				dispatch({
					type: actionTypes.SET_USER,
					user: result.user,
				});
			})
			.catch((error) => alert(error.message));
	};

	return (
		<div className="login">
			<div className="login__container">
				<img
					src="https://w7.pngwing.com/pngs/110/230/png-transparent-whatsapp-application-software-message-icon-whatsapp-logo-whats-app-logo-logo-grass-mobile-phones.png"
					alt="whatsapp"
				/>
				<div className="login__text">
					<h1>Sign in to Whatsapp</h1>
				</div>
				<Button onClick={signIn}>Sign in with Google</Button>
			</div>
		</div>
	);
};

export default Login;
