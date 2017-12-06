import React, { Component } from 'react'

import { Full } from './Full'
import { Done } from './Done'
import { Empty } from './Empty'
import { Put } from './Put'

class CartIcon extends Component {

    buttonComponent() {
        switch(this.props.state) {
            case 'done': return Done
            case 'full': return Full
            case 'put': return Put
            case 'empty':
            default: return Empty
        }
    }

    render() {
        const Icon = this.buttonComponent()

        return <Icon className={this.props.className}/>
    }
}

export {
    CartIcon
}