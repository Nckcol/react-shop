import React, { Component } from 'react'
import classNames from 'classnames'
import { Button } from '../core/Button';

class Pagination extends Component {
  render () {
    return (
      <div className={classNames(this.props.className)}>
        <Button>Load more</Button>
      </div>
    )
  }
}

export default Pagination