import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './index.styl'

class MenuSubMenu extends Component {
  static propTypes = {
    children: PropTypes.any,
    title: PropTypes.string,
    className: PropTypes.string
  }

  render () {
    const {className, children, ...rest} = this.props
    const classes = classNames({
      'ufe-sub-menu': true
    }, className)
    return (
      <li {...rest} className={classes}>
        {this.props.title}
        <ul>
          {this.props.children}
        </ul>
      </li>
    )
  }
}

export default MenuSubMenu
