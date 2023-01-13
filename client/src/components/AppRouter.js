import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { authRoutes, publicRoutes } from '../routes';
import { SHOP_ROUTE } from '../utils/constants';
import { Context } from '../index';

const AppRouter = () => {
	const { user } = useContext(Context);

	return (
		<Routes>
			{user.isAuth &&
				authRoutes.map(({ path, element }) => {
					return <Route key={path} path={path} element={element} />;
				})}
			{publicRoutes.map(({ path, element }) => {
				return <Route key={path} path={path} element={element} />;
			})}
			<Route path='*' element={<Navigate to={SHOP_ROUTE} />} />
		</Routes>
	);
};

export default AppRouter;
