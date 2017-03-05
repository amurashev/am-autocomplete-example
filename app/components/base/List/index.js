import React, { PropTypes } from 'react';
import classNames from 'classnames';

import { Fader } from '../'

import './styles.styl';


const UP_KEY = 38;
const DOWN_KEY = 40;
const ENTER_KEY = 13;
const ESC_KEY = 27;

const componentName = 'list';


export default class List extends React.Component {
	
	static defaultProps = {
		side: 'down'
	};

	state = {
		activeValue: -1
	};


	componentDidMount() {
		this.addKeyDownListiner();
	}

	handleListClose() {
		const { onCancelClick } = this.props;
		if(typeof onCancelClick === "function") {
			onCancelClick();
		}
	}

	/**
	 * Преобразуем выбранный элемент с помощью conversion функции
	 */
	handleItemClick(i) {
		const { onItemClick, multiSelect, data, conversion, value } = this.props;

		if(typeof onItemClick === "function") {

			const selectedItem = conversion ? conversion(data[i]) : data[i];
			const isSelected = multiSelect ? !!~value.indexOf(selectedItem.value) : value == selectedItem.value;

			onItemClick({
				value: selectedItem.value,
				isSelected,
				i
			});
		}
	}

	handleItemMouseEnter(key) {
		const { activeValue } = this.state;

		if(activeValue != key) {
			this.setState({ activeValue: key });
		}
	}

	handleItemMouseLeave(key) {
		const { activeValue } = this.state;

		if(activeValue != -1) {
			this.setState({ activeValue: -1 });
		}
	}



	addKeyDownListiner() {

		this.keyListiner = (e) => {

			const { data } = this.props;
			const { activeValue } = this.state;

			//if(isShow) return;

			if(e.keyCode == UP_KEY) {
				this.setState({
					activeValue: activeValue > 0 ? activeValue - 1 : 0
				});
			}
			if(e.keyCode == DOWN_KEY) {
				this.setState({
					activeValue: activeValue < data.length - 1 ? activeValue + 1 : data.length - 1
				});
			}
			if(e.keyCode == ENTER_KEY) {
				if((activeValue > 0 <= data.length) && data[activeValue]) {
					this.handleItemClick(activeValue);
				}
			}
			if(e.keyCode == ESC_KEY) {
				this.handleListClose();

			}

			if(e.keyCode == ESC_KEY || e.keyCode == ENTER_KEY ||
				e.keyCode == UP_KEY || e.keyCode == DOWN_KEY) {
				e.stopPropagation();
				e.preventDefault();
				return false;
			}
		};
		document.addEventListener("keydown", this.keyListiner, false);
	}

	render() {
		const { data, itemTemplate, itemProps, side } = this.props;
		const { activeValue } = this.state;
		
		const className = classNames(componentName, {
			[`${componentName}--side-down`]: side == 'down',
			[`${componentName}--side-up`]: side == 'up'
		});

		return (
			<div 
				className={className}
				ref={(ref) => this.list = ref}
			>
				<Fader onClick={() => this.handleListClose()} />
				<div className={classNames(componentName + '__items')}>
					{
						data.map((item, i) => {
	
							const isActive = activeValue == i;
							const childComponentName = componentName + '__item-box';
	
							return (
								<div
									key={i}
									className={classNames(childComponentName, { 
										[`${childComponentName}--is-active`]: isActive 
								    })}
									onMouseEnter={() => this.handleItemMouseEnter(i)}
									onMouseLeave={() => this.handleItemMouseLeave(i)}
									onClick={() => this.handleItemClick(i)}
								>
									{
										React.createElement(itemTemplate, {
											...itemProps,
											data: item,
											isActive
										})
									}
								</div>
							)
						})
					}
				</div>
			</div>
		);
	}

	componentWillUnmount() {
		document.removeEventListener("keydown", this.keyListiner, false);
	}
}
