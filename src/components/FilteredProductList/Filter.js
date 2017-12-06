import React, { Component } from 'react'
import classNames from 'classnames'

class Filter extends Component {
  render () {
    return (
      <div className={classNames(this.props.className)}>Filter</div>
    )
  }
}

export default Filter