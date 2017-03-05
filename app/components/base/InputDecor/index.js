import React, { PropTypes } from 'react';
import classNames from 'classnames';

import './styles.styl';

import { Label } from '../../base';

const componentName = 'input-decor';

export default ({ isFocus, placeHolder, children, isShow, side }) => {    
    
    const sideNormal = side === undefined ? 'full' : side;
    const className =classNames(componentName, {
        [`${componentName}--side-down`]: sideNormal == 'down',
        [`${componentName}--side-up`]: sideNormal == 'up'
    });
    
    const isShowNormal = isShow === undefined ? true : isShow;
    
    return (
        <div className={className}>
            <div className={classNames(componentName + '__placeholder-box', {
                [`${componentName}--is-focus`]: isFocus
            })}>
                {
                    isShowNormal ? 
                        <div className={classNames(componentName + '__placeholder-box-inner')}>
                            <Label
                                isActive={isFocus}
                                text={placeHolder}
                            />
                        </div>
                        : void 0
                }                
            </div>
            { children }
        </div>
    );
};
