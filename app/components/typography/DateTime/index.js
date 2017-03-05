import React from 'react';
import moment from 'moment';
import classNames from 'classnames/bind';

import styles from './styles.scss';
const cx = classNames.bind(styles);

export default function DateTime(props) {

	const momentData = moment(Number(props.value) * 1000).locale('ru');
	const formattedData = momentData.format('D MMM YYYY HH:mm');
	
	return (
		<span className={styles.dateTime}>
			{formattedData}
		</span>
	)
}
