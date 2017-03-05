import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import styles from './styles.scss';
const cx = classNames.bind(styles);

export default class Header extends React.Component {

	render() {

		const {children, size} = this.props;
		const className = cx(this.props.className || styles.header,  'size_' + size);
		
		switch(Number(size)) {
			case 1: return <h1 className={className}>{children}</h1>;
			case 2: return <h2 className={className}>{children}</h2>;
			case 3: return <h3 className={className}>{children}</h3>;
		}
	}
}
