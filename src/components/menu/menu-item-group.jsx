import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './index.styl'
import classNames from 'classnames'

class MenuItemGroup extends Component {
  static propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
    className: PropTypes.string
  }

  handleClick = e => {
    if (e.target === e.currentTarget.firstChild) {
      e.keys = []
    }
  }

  render () {
    const {children, title, className} = this.props
    const groupClass = classNames({
      [styles['ufe-menu-group']]: true
    }, className)
    const groupTitleClass = classNames({
      [styles['ufe-menu-group-title']]: true
    })
    const groupListClass = classNames({
      [styles['ufe-menu-group-list']]: true
    })
    return (
      <li onClickCapture={this.handleClick} className={groupClass}>
        <div className={groupTitleClass}>{title}</div>
        <ul className={groupListClass}>
          {children}
        </ul>
      </li>
    )
  }
}

export default MenuItemGroup
