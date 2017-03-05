import React from 'react';

import { mobilecheck } from '../../../utils/functions';

import { AutoComplete, SimpleSelectField } from '../';

export default ({ data, value, placeHolder, maxResultCount, onChange }) => {
	
	if(!mobilecheck()) {
		return (
			<AutoComplete
				data={data}
				value={value}
				placeHolder={placeHolder}
				maxResultCount={maxResultCount}
				onChange={onChange}
			/>
		)
	} else {
		return (
			<SimpleSelectField
				data={data}
				value={value}
				placeHolder={placeHolder}
				onChange={onChange}
			/>
		);
	}
};
