import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './index.styl'
import classNames from 'classnames'

class menuItem extends Component {
  static propTypes = {
    key: PropTypes.string,
    disbaled: PropTypes.bool,
    children: PropTypes.any,
    className: PropTypes.string
  }

  render () {
    const { key, disbaled, className, children, ...rest } = this.props
    const classes = classNames({
      'ufe-menu-item': true
    }, className)
    return (
      <li className={classes} key={key} {...rest}>
        {children}
      </li>
    )
  }
}

export default menuItem
