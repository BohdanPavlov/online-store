import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { DEVICE_ROUTE } from '../utils/constants';
import star from '../assets/star.png';

const DeviceItem = ({ device }) => {
	const navigate = useNavigate();

	return (
		<Col md={3} className='mt-3'>
			<Card
				style={{ width: 150, cursor: 'pointer', border: 'white' }}
				onClick={() => navigate(DEVICE_ROUTE + `/${device.id}`)}
			>
				<Image
					width={150}
					height={150}
					src={process.env.REACT_APP_API_URL + device.image}
					alt={device.name}
				/>
				<div className='d-flex justify-content-between align-items-center mt-1 text-black-50'>
					<div>Samsung</div>
					<div className='d-flex align-items-center gap-1'>
						<div>{device.rating}</div>
						<Image src={star}></Image>
					</div>
				</div>
				<div>{device.name}</div>
			</Card>
		</Col>
	);
};

export default DeviceItem;
