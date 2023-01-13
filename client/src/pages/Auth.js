import React, { useContext, useState } from 'react';
import { Button, Card, Container, Form, FormControl } from 'react-bootstrap';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import {
	LOGIN_ROUTE,
	REGISTRATION_ROUTE,
	SHOP_ROUTE,
} from '../utils/constants';
import { login, registration } from '../http/userApi';
import { Context } from '../index';

const Auth = observer(() => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { user } = useContext(Context);
	const location = useLocation();
	const navigate = useNavigate();

	const isLogin = location.pathname === LOGIN_ROUTE;

	const onAuth = async () => {
		try {
			let userData;
			if (isLogin) {
				userData = await login(email, password);
			} else {
				userData = await registration(email, password);
			}

			user.setUser(userData);
			user.setIsAuth(true);
			navigate(SHOP_ROUTE);
		} catch (e) {
			alert(e.response.data.message);
		}
	};

	return (
		<Container
			className='d-flex justify-content-center align-items-center'
			style={{ height: window.innerHeight - 54 }}
		>
			<Card style={{ width: 600 }} className='p-5'>
				<h2 className='text-center'>{isLogin ? 'Log In' : 'Sign In'}</h2>
				<Form className='d-flex flex-column gap-3'>
					<FormControl
						placeholder='Enter your email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<FormControl
						type='password'
						placeholder='Enter your password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					<div className='d-flex justify-content-between align-items-center'>
						{isLogin ? (
							<div>
								No account?
								<NavLink to={REGISTRATION_ROUTE} className='ms-2'>
									Sign In
								</NavLink>
							</div>
						) : (
							<div>
								Already registered?
								<NavLink to={LOGIN_ROUTE} className='ms-2'>
									Log In
								</NavLink>
							</div>
						)}
						<Button variant='outline-success' onClick={onAuth}>
							{isLogin ? 'Log In' : 'Sign In'}
						</Button>
					</div>
				</Form>
			</Card>
		</Container>
	);
});

export default Auth;
