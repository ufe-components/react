import React, { Component } from 'react'
import classNames from 'classnames'
import styles from './index.styl'
import PropTypes from 'prop-types'

class ButtonGroup extends Component {
  static propTypes = {
    size: PropTypes.oneOf(['large', 'small']),
    className: PropTypes.string
  }

  render () {
    const { size, className, ...rest } = this.props
    const classes = classNames({
      [styles['ufe-btn-group']]: true,
      [styles[`ufe-btn-group-${size}`]]: !!size
    }, className)
    return (
      <div {...rest} className={classes} />
    )
  }
}

export default ButtonGroup
