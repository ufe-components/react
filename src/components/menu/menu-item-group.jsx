import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MenuItemGroup extends Component {
  static propTypes = {
    children: PropTypes.any,
    title: PropTypes.string
  }

  render () {
    return (
      <li>
        <div>{this.props.title}</div>
        <ul>
          {this.props.children}
        </ul>
      </li>
    )
  }
}

export default MenuItemGroup
