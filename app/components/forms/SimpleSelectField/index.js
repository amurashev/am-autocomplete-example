import React, { PropTypes } from 'react';
import classNames from 'classnames';

import './styles.styl';

import { InputDecor, Icon } from '../../base';

const componentName = 'simple-select-field';

export default class AutoComplete extends React.Component {

	constructor(props){
		super(props);

	}

	static defaultProps = {
		placeHolder: '',       //Подсказка для текстового поля
		data: [],              //Массив входных данных
		value: null,           //Выбранное значение в АК
		onChange: void 0      //Событие изменение текстового поля АК
	};

	state = {
		sortedData: []       //Отсортированный массив данных
	};

	componentWillMount(){
		this.prepareData(this.props);
	}

	componentWillReceiveProps(props) {
		this.prepareData(props);
	}	

	prepareData(props){
		const { data } = props;
		this.setState({
			sortedData: [...data.sort((a,b) => ((a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0)))]
		});
	}


	/**
	 * Событие выбора значения из списка
	 * Запускаем событие выбора значения
	 */
	handleItemSelect(id){
		const { sortedData } = this.state;

		if(sortedData) {
			const selectedValue = sortedData.filter(item => item.id === id)[0];
			const { onChange } = this.props;
			if(typeof onChange === "function") {
				onChange(selectedValue);
			}
		}
	}

	render() {
		const { sortedData } = this.state;
		const { value, placeHolder } = this.props;
		
		const hasValue = !!value;

		return (
			<div className={classNames(componentName)}>
				<InputDecor
					isFocus={hasValue}
					placeHolder={placeHolder}
				>
					<div className={classNames(componentName + '__inner-box')}>
						<div className={classNames(componentName + '__value-box')}>
							{
								hasValue ? value.value: void 0
							}
						</div>
						<div className={classNames(componentName + '__icon-box')}>
							<Icon type={"arrow_drop_down"} />
						</div>
						<div className={classNames(componentName + '__select-box')}>
							<select
								className={classNames(componentName + '__select')}
								onChange={(e) => this.handleItemSelect(e.target.value)}
							    value={hasValue ? value.id : void 0}
							>
								{
									sortedData.map((d, i) => 
										<option value={d.id} key={i}>{d.value}</option>
									)
								}
							</select>
						</div>
					</div>
				</InputDecor>

			</div>
		);
	}

}