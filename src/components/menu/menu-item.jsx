import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './index.styl'
import classNames from 'classnames'
import { withMenu } from './menu-context'

class menuItem extends Component {
  static propTypes = {
    id: PropTypes.string,
    disbaled: PropTypes.bool,
    children: PropTypes.any,
    className: PropTypes.string,
    selectedKeys: PropTypes.array,
    itemClick: PropTypes.func,
    disabled: PropTypes.bool,
    mode: PropTypes.string,
    isRecusive: PropTypes.bool,
    onOpenChange: PropTypes.func
  }

  handleClick = e => {
    const keys = e.keys || []
    if (this.props.itemClick && this.props.id) {
      keys.push(this.props.id)
      e.keys = []
      this.props.itemClick(keys)
    }
  }

  render () {
    const { disbaled, className, children, selectedKeys, id, itemClick, disabled, mode, isRecusive, onOpenChange, ...rest } = this.props
    const classes = classNames({
      [styles['ufe-menu-item']]: true,
      [styles['ufe-menu-item-selected']]: selectedKeys && selectedKeys.indexOf(id) > -1,
      [styles['ufe-menu-item-disabled']]: disabled
    }, className)
    return (
      <li className={classes} {...rest} onClickCapture={this.handleClick}>
        {children}
      </li>
    )
  }
}

export default withMenu(menuItem)
