import React, { Component } from 'react'
import styles from './index.styl'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class Option extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    disabled: PropTypes.bool,
    isHover: PropTypes.bool
  }

  state = {
    isHover: this.props.isHover
  }

  static getDerivedStateFromProps (props, state) {
    if ('isHover' in props) {
      return Object.assign({}, state, {
        isHover: props.isHover
      })
    }
    return state
  }

  handleChange = e => {
    const { value, disabled, onChange } = this.props
    if (!disabled) {
      onChange(value)
    }
  }

  render () {
    const { className, value, style, onChange, children, selectedValue, disabled, isHover, ...rest } = this.props
    const classes = classnames({
      [styles['ufe-select-item']]: true,
      [styles['ufe-select-item-selected']]: selectedValue === value,
      [styles['ufe-select-item-disabled']]: disabled,
      [styles['ufe-select-item-hover']]: this.state.isHover
    }, className)
    return (
      <li {...rest} className={classes} style={style} onClick={this.handleChange}>{children}</li>
    )
  }
}

export default Option
