import React, { PropTypes } from 'react';
import classNames from 'classnames';

import './styles.styl';

const componentName = 'form-field';

export default ({children}) => {
	return (
		<div className={classNames(componentName)}>
			{children}
		</div>
	)
};
