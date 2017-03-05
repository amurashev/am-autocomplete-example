import React, { PropTypes } from 'react';
import classNames from 'classnames';

import './styles.styl';

const componentName = 'input';

export default class Input extends React.Component {


    static defaultProps = {
        type: 'text',
        value: '',
        classes: {},
        isDisabled: false,
        blurWithEqualValues: false
    };

    state = {
        onFocus: false,
        inputValue: ''
    };

    componentDidMount() {
        const { value } = this.props;
        this.setState({ inputValue: value });
    }

    componentWillReceiveProps(props) {
        const { value } = props;
        this.setState({ inputValue: value });
    }

    onInputKeyDown({keyCode}) {
        const {onKeyDown} = this.props;

        if(typeof onKeyDown === "function") {

            const newValue = this.checkValidation(this.input.value);
            onKeyDown({
                keyCode,
                value: newValue
            });
        }
    }

    onInputChange(value) {
        const {onChange} = this.props;
        const newValue = this.checkValidation(value);

        this.setState({
            inputValue: newValue
        });

        if(typeof onChange === "function") {
            onChange(newValue);
        }
    }

    onInputFocus() {
        const {onFocus} = this.props;

        this.setState({
            onFocus: true
        });

        if(typeof onFocus === "function") {
            onFocus(this.input.value);
        }
    }

    onInputBlur() {
        const { onBlur, blurWithEqualValues } = this.props;
        const oldValue = this.props.value || '';

        this.setState({
            onFocus: false
        });

        if(typeof onBlur === "function") {
            const newValue = this.input ? this.input.value : '';
            if(oldValue != newValue || blurWithEqualValues) {
                onBlur(newValue);
            }
        }
    }


    checkValidation(value) {
        const {onlyNumber} = this.props;

        if(onlyNumber) {
            const reg = /\-?\d+(\.\d{0,2})?/g.exec(value);
            return reg ? reg[0] : '';
        } else {
            return value;
        }
    }


    render() {
        const { type, maxLength, isDisabled } = this.props;
        const { inputValue } = this.state;

        const className = classNames(componentName);

        return (
            <div className={className}> 
                <input
                    ref={(ref) => this.input = ref}
                    type={type}
                    className={classNames(componentName + '__input')}
                    value={inputValue}
                    maxLength={maxLength}
                    disabled={isDisabled}
                    onChange={(e) => this.onInputChange(e.target.value)}
                    onKeyDown={(e) => this.onInputKeyDown(e)}
                    onFocus={() => this.onInputFocus()}
                    onBlur={() => this.onInputBlur()}
                />
            </div>
        );
    }

}

