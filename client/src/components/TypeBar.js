import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';

import { Context } from '../index';

const TypeBar = observer(() => {
	const { device } = useContext(Context);

	const renderTypes = (device) => {
		return device.types.map((type) => {
			const classNames = `list-group-item ${
				type.id === device.selectedType.id ? 'active' : null
			}`;

			return (
				<li
					key={type.id}
					style={{ cursor: 'pointer' }}
					className={classNames}
					onClick={() => device.setSelectedType(type)}
				>
					{type.name}
				</li>
			);
		});
	};

	const types = renderTypes(device);

	return <ul className='list-group'>{types}</ul>;
});

export default TypeBar;
