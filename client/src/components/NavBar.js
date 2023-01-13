import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import {
	ADMIN_ROUTE,
	LOGIN_ROUTE,
	REGISTRATION_ROUTE,
	SHOP_ROUTE,
} from '../utils/constants';
import { Context } from '../index';

const NavBar = observer(() => {
	const { user } = useContext(Context);
	const navigate = useNavigate();

	const logOut = () => {
		user.setUser({});
		user.setIsAuth(false);
		localStorage.removeItem('token');
	};

	return (
		<Navbar bg='dark' variant='dark'>
			<Container>
				<Link
					to={SHOP_ROUTE}
					className='text-white text-decoration-none'
					style={{ fontSize: '1.5em' }}
				>
					HypeShop
				</Link>
				{user.isAuth ? (
					<Nav className='ml-auto text-white d-flex gap-3'>
						<Button
							variant={'outline-light'}
							onClick={() => navigate(ADMIN_ROUTE)}
						>
							Admin Panel
						</Button>
						<Button variant={'outline-light'} onClick={logOut}>
							Log Out
						</Button>
					</Nav>
				) : (
					<Nav className='ml-auto text-white'>
						<Button
							variant={'outline-light'}
							onClick={() => navigate(LOGIN_ROUTE)}
						>
							Authorization
						</Button>
					</Nav>
				)}
			</Container>
		</Navbar>
	);
});

export default NavBar;
