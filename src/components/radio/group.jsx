import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './index.styl'
import classnames from 'classnames'
import Radio from './radio'

class RadioGroup extends Component {
  static propTypes = {
    children: PropTypes.any,
    style: PropTypes.object,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    value: PropTypes.string,
    defaultValue: PropTypes.any,
    options: PropTypes.array,
    size: PropTypes.oneOf(['large', 'small'])
  }

  static defaultProps = {
    defaultValue: ''
  }

  state = {
    value: this.props.value || this.props.defaultValue || undefined
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

  toggleOption = e => {
    const lastValue = this.state.value
    const value = e.target.value

    if (!('value' in this.props)) {
      this.setState({
        value
      })
    }

    if (this.props.onChange && value !== lastValue) {
      this.props.onChange(e)
    }
  }

  render () {
    let { style, className, options, disabled, onChange, defaultValue, value, children, size, ...rest } = this.props
    if (options && options.length > 0) {
      children = this.getOptions(options).map(option => (
        <Radio
          key={option.value.toString()}
          disabled={disabled ? !!disabled : !!option.disabled}
          value={option.value}
          checked={this.state.value === option.value}
          onChange={this.toggleOption}
        >
          {option.label}
        </Radio>
      ))
    } else {
      children = React.Children.map(children, child => {
        return React.cloneElement(child, {checked: this.state.value === child.props.value, onChange: () => { this.setState({value: child.props.value}) }})
      })
    }
    const classes = classnames({
      [styles['ufe-radio-group']]: true,
      [styles[`ufe-radio-group-${size}`]]: !!size
    }, className)
    return (
      <div className={classes} style={style}>
        {
          React.Children.map(children, child => {
            return React.cloneElement(child, {...rest})
          })
        }
      </div>
    )
  }
}

export default RadioGroup
