import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.styl'

class Button extends Component {
  static propTypes = {
    type: PropTypes.string,
    size: PropTypes.oneOf(['large', 'default', 'small']),
    onClick: PropTypes.func,
    icon: PropTypes.string,
    children: PropTypes.node,
    shape: PropTypes.oneOf(['circle']),
    ghost: PropTypes.bool,
    className: PropTypes.string
  }

  state = {
    clicked: false
  }

  timer

  handleClick = e => {
    this.setState({clicked: true})
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState({clicked: false})
    }, 500)
    this.props.onClick && this.props.onClick(e)
  }

  componentWillMount () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }

  render () {
    const { type, size, icon, children, shape, ghost, className, ...rest } = this.props
    const iconClass = `fa fa-${icon}`
    const iconNode = icon ? <i className={iconClass} /> : null
    const classes = classNames({
      [styles['ufe-btn']]: true,
      [styles[`ufe-btn-${type}`]]: !!type,
      [styles[`ufe-btn-${size}`]]: !!size,
      [styles['ufe-btn-clicked']]: this.state.clicked,
      [styles[`ufe-btn-${shape}`]]: !!shape && !!icon,
      [styles['ufe-btn-ghost']]: !!ghost
    }, className)
    return (
      <button {...rest} className={classes} onClick={this.handleClick}>
        {iconNode}{(!shape || !icon) && children}
      </button>
    )
  }
}

export default Button
