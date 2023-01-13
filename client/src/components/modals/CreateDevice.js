import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Dropdown, Form, Modal, Row } from 'react-bootstrap';
import { observer } from 'mobx-react-lite';

import { Context } from '../../index';
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviceApi';

const CreateDevice = observer(({ show, onHide }) => {
	const { device } = useContext(Context);
	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [file, setFile] = useState(null);
	const [info, setInfo] = useState([]);

	useEffect(() => {
		fetchTypes().then((data) => device.setTypes(data));
		fetchBrands().then((data) => device.setBrands(data));
	}, []);

	const addInfo = () => {
		setInfo([...info, { title: '', description: '', number: Date.now() }]);
	};

	const removeInfo = (number) => {
		setInfo((info) => {
			return info.filter((i) => i.number !== number);
		});
	};

	const changeInfo = (key, value, number) => {
		setInfo(
			info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
		);
	};

	const selectFile = (e) => {
		setFile(e.target.files[0]);
	};

	const addDevice = () => {
		const formData = new FormData();
		formData.append('name', name);
		formData.append('price', `${price}`);
		formData.append('image', file);
		formData.append('brandId', device.selectedBrand.id);
		formData.append('typeId', device.selectedType.id);
		formData.append('info', JSON.stringify(info));
		createDevice(formData).then((data) => onHide());
	};

	const renderInfoForm = (info) => {
		return info.map((i) => {
			return (
				<Row key={i.number}>
					<Col md={4}>
						<Form.Control
							placeholder='Enter property title'
							value={i.title}
							onChange={(e) => changeInfo('title', e.target.value, i.number)}
						/>
					</Col>
					<Col md={4}>
						<Form.Control
							placeholder='Enter property description'
							value={i.description}
							onChange={(e) =>
								changeInfo('description', e.target.value, i.number)
							}
						/>
					</Col>
					<Col md={4}>
						<Button
							variant='outline-danger'
							onClick={() => removeInfo(i.number)}
						>
							Delete
						</Button>
					</Col>
				</Row>
			);
		});
	};

	const infoForm = renderInfoForm(info);

	return (
		<Modal show={show} onHide={onHide} size='lg' centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Add new device
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form className='d-flex flex-column gap-3'>
					<div className='d-flex gap-2'>
						<Dropdown>
							<Dropdown.Toggle>
								{device.selectedType.name || 'Choose type'}
							</Dropdown.Toggle>
							<Dropdown.Menu>
								{device.types.map((type) => (
									<Dropdown.Item
										key={type.id}
										onClick={() => device.setSelectedType(type)}
									>
										{type.name}
									</Dropdown.Item>
								))}
							</Dropdown.Menu>
						</Dropdown>
						<Dropdown>
							<Dropdown.Toggle>
								{device.selectedBrand.name || 'Choose brand'}
							</Dropdown.Toggle>
							<Dropdown.Menu>
								{device.brands.map((brand) => (
									<Dropdown.Item
										key={brand.id}
										onClick={() => device.setSelectedBrand(brand)}
									>
										{brand.name}
									</Dropdown.Item>
								))}
							</Dropdown.Menu>
						</Dropdown>
					</div>
					<div className='d-flex flex-column gap-3'>
						<Form.Control
							placeholder='Enter device name'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<Form.Control
							placeholder='Enter currency'
							type='number'
							value={price}
							onChange={(e) => setPrice(Number(e.target.value))}
						/>
						<Form.Control type='file' onChange={selectFile} />
					</div>
					<hr />
					<Button variant='outline-dark' onClick={addInfo}>
						Add new property
					</Button>
					{infoForm}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-success' onClick={addDevice}>
					Add
				</Button>
				<Button variant='outline-danger' onClick={onHide}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
});

export default CreateDevice;
