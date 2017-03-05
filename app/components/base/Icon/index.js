import React, { PropTypes } from 'react';
import classNames from 'classnames';

import './styles.styl';

const componentName = 'icon';

export default ({type}) => {
	const className = classNames(componentName, 'material-icons');
	return <i 
		type={type} 
		className={className}
	>{type}</i>
};





