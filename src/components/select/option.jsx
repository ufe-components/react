import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styles from './index.styl'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Icon from '../icon'

class Option extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    selectedValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.number)]),
    disabled: PropTypes.bool,
    isHover: PropTypes.bool,
    multiple: PropTypes.bool,
    changeItemHover: PropTypes.func
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
      onChange(e, value)
    } else {
      e.stopPropagation()
    }
  }

  componentDidMount () {
    const dom = ReactDOM.findDOMNode(this)
    dom.addEventListener('click', this.handleChange)
  }

  componentWillUnmount () {
    const dom = ReactDOM.findDOMNode(this)
    dom.removeEventListener('click', this.handleChange)
  }

  handleEnter = e => {
    this.props.changeItemHover(this.props.value)
  }

  render () {
    const { className, value, style, onChange, children, selectedValue, disabled, isHover, multiple, changeItemHover, ...rest } = this.props
    const isSelected = Array.isArray(selectedValue) ? selectedValue.includes(value) : selectedValue === value
    const classes = classnames({
      [styles['ufe-select-item']]: true,
      [styles['ufe-select-item-selected']]: isSelected,
      [styles['ufe-select-item-disabled']]: disabled,
      [styles['ufe-select-item-multiple']]: multiple,
      [styles['ufe-select-item-hover']]: this.state.isHover
    }, className)
    return (
      <li onMouseEnter={this.handleEnter} {...rest} className={classes} style={style}>
        {children}
        {multiple ? <Icon type='check' /> : null}
      </li>
    )
  }
}

export default Option
