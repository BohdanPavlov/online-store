import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Card } from 'react-bootstrap';

import { Context } from '../index';

const BrandBar = observer(() => {
	const { device } = useContext(Context);

	const renderBrands = (device) => {
		return device.brands.map((brand) => {
			return (
				<Card
					style={{ cursor: 'pointer', flex: '0 1 16.6%' }}
					key={brand.id}
					className='py-1 px-2 text-center'
					onClick={() => device.setSelectedBrand(brand)}
					border={brand.id === device.selectedBrand.id ? 'success' : 'primary'}
				>
					{brand.name}
				</Card>
			);
		});
	};

	const brandsCards = renderBrands(device);

	return <div className='d-flex gap-2 flex-wrap'>{brandsCards}</div>;
});

export default BrandBar;
