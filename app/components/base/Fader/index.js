import React, { PropTypes } from 'react';
import classNames from 'classnames';

import './styles.styl';

const componentName = 'fader';

export default ({ onClick }) => {
    return (
        <div
            className={classNames(componentName)}
            onClick={() => onClick()}
        />
    )
};
