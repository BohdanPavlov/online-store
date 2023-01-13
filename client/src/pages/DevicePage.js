import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import bigStar from '../assets/big-star.png';
import { fetchOneDevice } from '../http/deviceApi';

const DevicePage = observer(() => {
	const [device, setDevice] = useState({ info: [] });
	const { id } = useParams();

	useEffect(() => {
		fetchOneDevice(id).then((device) => setDevice(device));
	}, []);

	const renderInfo = (description) => {
		return description.map((info, i) => {
			return (
				<Row
					key={info.id}
					style={{
						background: i % 2 ? 'transparent' : 'lightgrey',
						padding: 10,
					}}
				>
					{info.title}: {info.description}
				</Row>
			);
		});
	};

	const deviceInfo = renderInfo(device.info);

	return (
		<Container className='mt-2'>
			<Row>
				<Col md={4}>
					<Image
						width={300}
						height={300}
						src={process.env.REACT_APP_API_URL + device.image}
					/>
				</Col>
				<Col md={4}>
					<div className='d-flex flex-column align-items-center'>
						<h2>{device.name}</h2>
						<div
							className='d-flex align-items-center justify-content-center'
							style={{
								background: `url(${bigStar}) no-repeat center center`,
								width: 240,
								height: 240,
								backgroundSize: 'cover',
								fontSize: '1.3em',
							}}
						>
							{device.rating}
						</div>
					</div>
				</Col>
				<Col md={4}>
					<Card
						className='d-flex align-items-center justify-content-around'
						style={{
							width: 300,
							height: 300,
							fontSize: 32,
							border: '5xp solid lightgray',
						}}
					>
						<h3>From: {device.price}$</h3>
						<Button variant={'outline-success'}>Add to basket</Button>
					</Card>
				</Col>
			</Row>
			<Row className='mt-3'>
				<h1>Description</h1>
				{deviceInfo}
			</Row>
		</Container>
	);
});

export default DevicePage;
