import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';

import CreateType from '../components/modals/CreateType';
import CreateBrand from '../components/modals/CreateBrand';
import CreateDevice from '../components/modals/CreateDevice';

const Admin = () => {
	const [brandVisible, setBrandVisible] = useState(false);
	const [typeVisible, setTypeVisible] = useState(false);
	const [deviceVisible, setDeviceVisible] = useState(false);

	return (
		<Container className='d-flex flex-column gap-2 my-2'>
			<Button variant='outline-dark' onClick={() => setTypeVisible(true)}>
				ADD TYPE
			</Button>
			<Button variant='outline-dark' onClick={() => setBrandVisible(true)}>
				ADD BRAND
			</Button>
			<Button variant='outline-dark' onClick={() => setDeviceVisible(true)}>
				ADD DEVICE
			</Button>
			<CreateType show={typeVisible} onHide={() => setTypeVisible(false)} />
			<CreateBrand show={brandVisible} onHide={() => setBrandVisible(false)} />
			<CreateDevice
				show={deviceVisible}
				onHide={() => setDeviceVisible(false)}
			/>
		</Container>
	);
};

export default Admin;
