import React, { PropTypes } from 'react';
import classNames from 'classnames';

import './styles.styl';

const componentName = 'search-list-item';

export default ({ data, isActive, str }) => {
	
	const { value } = data;
	const className = classNames(componentName, {
		[`${componentName}--is-active`]: isActive
	});
	
	const foundedStringIndex = value.toLocaleLowerCase().indexOf(str.toLocaleLowerCase());	
	const foundedStringLength = str.length;
	
	const beginString = value.slice(0, foundedStringIndex);
	const foundedString = value.slice(foundedStringIndex, foundedStringIndex + foundedStringLength);
	const endString = value.slice(foundedStringIndex + foundedStringLength, value.length);	
	
	
	return (
		<div className={className}>
			<span>{beginString}</span>
			<span className={classNames(componentName + '__founded-str')}>{foundedString}</span>
			<span>{endString}</span>			
		</div>
	)
};





