import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './index.styl'
import classnames from 'classnames'
import Group from './group'

class CheckBox extends Component {
  static propTypes = {
    children: PropTypes.any,
    style: PropTypes.object,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    indeterminate: PropTypes.bool
  }

  checkBoxRef = React.createRef()

  state = {
    checked: false
  }

  static getDerivedStateFromProps (props, state) {
    if ('checked' in props) {
      return Object.assign({}, state, {
        checked: props.checked
      })
    }
    return state
  }

  handleChange = e => {
    if (this.props.disabled) return
    if (!('checked' in this.props)) {
      this.setState({
        checked: e.target.checked
      })
    }
    if (this.props.onChange) {
      this.props.onChange({
        target: {
          ...this.props,
          checked: e.target.checked
        },
        stopPropagation () {
          e.stopPropagation()
        },
        preventDefault () {
          e.preventDefault()
        },
        nativeEvent: e.nativeEvent
      })
    }
  }

  focus () {
    this.checkBoxRef.current.focus()
  }

  blur () {
    this.checkBoxRef.current.blur()
  }

  render () {
    const {children, style, className, disabled, onChange, indeterminate, ...rest} = this.props
    const checked = this.state.checked
    const wrapper = classnames({
      [styles['ufe-checkbox-wrapper']]: true
    }, className)
    const checkboxClassName = classnames({
      [styles['ufe-checkbox']]: true,
      [styles['ufe-checkbox-checked']]: !!checked,
      [styles['ufe-checkbox-disabled']]: !!disabled,
      [styles['ufe-checkbox-indeterminate']]: !!indeterminate
    })
    return (
      <label className={wrapper} style={style}>
        <span className={checkboxClassName}>
          <input ref={this.checkBoxRef} onChange={this.handleChange} checked={!!checked} className={styles['ufe-checkbox-input']} type='checkbox' {...rest} />
          <span className={styles['ufe-checkbox-inner']} />
        </span>
        {children !== undefined ? <span>{children}</span> : null }
      </label>
    )
  }
}

CheckBox.Group = Group

export default CheckBox
