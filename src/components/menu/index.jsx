import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Item from './menu-item'
import SubMenu from './menu-sub-menu'
import ItemGroup from './menu-item-group'
import styles from './index.styl'
import classNames from 'classnames'
import { Provider } from './menu-context'

class Menu extends Component {
  static propTypes = {
    children: PropTypes.any,
    className: PropTypes.string,
    mode: PropTypes.oneOf(['vertical', 'inline', 'horizontal', 'vertical-right']),
    selectedKeys: PropTypes.array,
    itemClick: PropTypes.func,
    onOpenChange: PropTypes.func
  }

  static defaultProps = {
    mode: 'vertical'
  }

  render () {
    const {className, children, mode, selectedKeys, itemClick, onOpenChange, ...rest} = this.props
    const classes = classNames({
      [styles['ufe-menu']]: true,
      [styles[`ufe-menu-${mode}`]]: !!mode
    }, className)

    return (
      <Provider value={{selectedKeys, itemClick, mode, onOpenChange}}>
        <ul {...rest} className={classes}>
          {children}
        </ul>
      </Provider>
    )
  }
}

Menu.Item = Item
Menu.SubMenu = SubMenu
Menu.ItemGroup = ItemGroup

export default Menu
