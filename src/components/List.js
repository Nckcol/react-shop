import React, { Component } from 'react'

class List extends Component {

  renderItem(item, props) {
    const {
      classNameItem,
      render,
      index
    } = props

    return (
      <div key={index} className={classNameItem}>
        {render({ item })}
      </div>
    )
  }

  render() {
    const {
      list,
      className,
      classNameItem,
      render
    } = this.props



    return (
      <div className={className}>
        { list.map((item, index) => this.renderItem(item, { classNameItem, render, index })) }
      </div>
    )
  }
}

export default List