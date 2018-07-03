import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from './menu-item'
import SubMenu from './menu-sub-menu'
import ItemGroup from './menu-item-group'
import './index.styl'
import classNames from 'classnames'

class Menu extends Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    mode: PropTypes.oneOf(['vertical', 'inline', 'horizontal', 'vertical-right'])
  }

  static defaultProps = {
    mode: 'vertical'
  }

  render () {
    const {className, children, mode, ...rest} = this.props
    const classes = classNames({
      'ufe-menu': true,
      [`ufe-menu-${mode}`]: !!mode
    }, className)

    return (
      <ul {...rest} className={classes}>
        {children}
      </ul>
    )
  }
}

Menu.Item = Item
Menu.SubMenu = SubMenu
Menu.ItemGroup = ItemGroup

export default Menu
