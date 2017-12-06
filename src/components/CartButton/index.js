import React, { Component } from 'react'

import { Button } from '../core/Button'
import { CartIcon } from '../CartIcon'

import './CartButton.css'

class CartButton extends Component {
    render() {
        return (
            <Button className='CartButton' invert>
                <span className='CartButton-caption'>In cart</span>
                <CartIcon className='CartButton-icon' state={ this.props.count ? 'full' : 'empty' } />
                {
                    this.props.count
                    ? <span className='CartButton-badge'>{this.props.count}</span>
                    : null
                }
            </Button>
        )
    }
}

export {
    CartButton
}
