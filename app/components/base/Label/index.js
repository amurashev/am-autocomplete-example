import React, { PropTypes } from 'react';
import classNames from 'classnames';

import './styles.styl';

const componentName = 'label';

export default ({isActive, text}) => {
    return <label className={classNames(componentName, { 
        //[`${componentName}--is-active`]: isActive 
    })}>{text}</label>
};
