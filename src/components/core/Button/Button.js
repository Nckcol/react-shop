import React, { Component } from 'react'
import './Button.css'
import classNames from 'classnames';

class Button extends Component {
    render() {
        return <button 
            className={classNames([
                this.props.className, 
                'Button',
                {
                    'Button--primary': this.props.primary,
                    'Button--secondary': this.props.secondary,
                    'Button--invert': this.props.invert
                }
            ])}
            onClick={this.props.onClick}
            >{this.props.children}</button>
    }
}

export {
    Button 
}