import React, { Component } from 'react'
import classNames from 'classnames'

class Done extends Component {
  render() {

    const {
      className
    } = this.props

    return (
      <svg className={classNames(className)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 484.955 484.955">
        <path d="M258.005 218.355c2.3 2.3 5.4 3.5 8.5 3.5s6.1-1.2 8.5-3.5l73.9-73.9c4.7-4.7 4.7-12.3 0-17s-12.3-4.7-17 0l-65.4 65.5-26.4-26.4c-4.7-4.7-12.3-4.7-17 0s-4.7 12.3 0 17l34.9 34.8z"/>
        <path d="M145.005 318.355h268.9c29.7 0 53.8-24.2 53.8-53.8v-113.3c0-6.6-5.4-12-12-12s-12 5.4-12 12v113.2c0 16.5-13.4 29.8-29.8 29.8h-268.9c-16.5 0-29.8-13.4-29.8-29.8v-221.2c0-.4 0-.9-.1-1.3v-.3c0-.3-.1-.6-.1-.8s-.1-.5-.2-.7c0-.1-.1-.3-.1-.4-.1-.3-.2-.5-.3-.8 0-.1-.1-.2-.1-.3-.1-.2-.2-.5-.3-.7-.1-.1-.1-.3-.2-.4l-.3-.6c-.1-.2-.2-.3-.3-.5-.1-.1-.2-.3-.3-.4-.1-.2-.3-.4-.4-.5l-.3-.3c-.2-.2-.3-.4-.5-.6-.1-.1-.2-.2-.3-.2-.2-.2-.4-.4-.6-.5l-.3-.3c-.2-.1-.4-.3-.6-.4-.2-.2-.5-.3-.7-.5-.1 0-.2-.1-.2-.2l-1.2-.6-73.9-31c-6.1-2.6-13.1.3-15.7 6.4-2.6 6 .3 13.1 6.4 15.7l66.5 28.1v297.6c0 28.2 21.7 51.3 49.3 53.6-5.6 8.4-8.9 18.5-8.9 29.4 0 29.3 23.9 53.2 53.2 53.2s53.2-23.9 53.2-53.2c0-10.8-3.2-20.8-8.7-29.2h127.3c-5.5 8.4-8.7 18.4-8.7 29.2 0 29.3 23.9 53.2 53.2 53.2s53.2-23.9 53.2-53.2-23.9-53.2-53.2-53.2h-256c-16.5 0-29.8-13.4-29.8-29.8v-39.5c8.5 5.7 18.8 9.1 29.8 9.1zm68.9 113.4c0 16.1-13.1 29.2-29.2 29.2s-29.2-13.1-29.2-29.2 13.1-29.2 29.2-29.2 29.2 13.1 29.2 29.2zm216.2 0c0 16.1-13.1 29.2-29.2 29.2s-29.2-13.1-29.2-29.2 13.1-29.2 29.2-29.2 29.2 13.1 29.2 29.2z"/>
      </svg>
    )
  }
}

export {
  Done
}
