import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './index.styl'
import classnames from 'classnames'
import Checkbox from './index'

class CheckBoxGroup extends Component {
  static propTypes = {
    children: PropTypes.any,
    style: PropTypes.object,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.array,
    defaultValue: PropTypes.array,
    options: PropTypes.array.isRequired
  }

  static defaultTypes = {
    defaultValue: []
  }

  state = {
    value: this.props.value || this.props.defaultValue || []
  }

  static getDerivedStateFromProps (props, state) {
    if ('value' in props) {
      return Object.assign({}, state, {
        value: props.value
      })
    }
    return state
  }

  getOptions (options) {
    return options.map(option => {
      if (typeof option === 'string') {
        return {
          label: option,
          value: option
        }
      }
      return option
    })
  }

  toggleOption = option => {
    const index = this.state.value.indexOf(option.value)
    const value = [...this.state.value]
    if (index === -1) {
      value.push(option.value)
    } else {
      value.splice(index, 1)
    }

    if (!('value' in this.props)) {
      this.setState({
        value
      })
    }

    if (this.props.onChange) {
      this.props.onChange(value)
    }
  }

  render () {
    const { style, className, options, disabled, onChange, ...rest } = this.props
    let children = this.props.children
    if (options && options.length > 0) {
      children = this.getOptions(options).map(option => (
        <Checkbox
          key={option.value.toString()}
          disabled={disabled ? !!disabled : !!option.disabled}
          value={option.value}
          checked={this.state.value.indexOf(option.value) !== -1}
          onChange={() => this.toggleOption(option)}
          className={styles['ufe-checkbox-group-item']}
        >
          {option.label}
        </Checkbox>
      ))
    }
    const classes = classnames({
      [styles['ufe-checkbox-group']]: true
    }, className)
    return (
      <div className={classes} style={style} {...rest}>
        {children}
      </div>
    )
  }
}

export default CheckBoxGroup
