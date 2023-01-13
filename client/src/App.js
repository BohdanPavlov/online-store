import { BrowserRouter as Router } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useContext, useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';

import NavBar from './components/NavBar';
import AppRouter from './components/AppRouter';
import { Context } from './index';
import { check } from './http/userApi';

const App = observer(() => {
	const { user } = useContext(Context);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			check()
				.then((data) => {
					user.setUser(data);
					user.setIsAuth(true);
				})
				.finally(() => setLoading(false));
		}, 1000);
	}, []);

	if (loading) {
		return <Spinner animation='grow' />;
	}

	return (
		<Router>
			<NavBar />
			<AppRouter />
		</Router>
	);
});

export default App;
