import React, { Component } from 'react'
import styles from './index.styl'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class Radio extends Component {
  static propTypes = {
    children: PropTypes.any,
    style: PropTypes.object,
    className: PropTypes.string,
    onChange: PropTypes.func,
    disabled: PropTypes.bool,
    checked: PropTypes.bool,
    type: PropTypes.oneOf(['radio', 'button'])
  }

  radioRef = React.createRef()

  static defaultProps = {
    type: 'radio'
  }

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

  focus () {
    this.radioRef.current.focus()
  }

  blur () {
    this.radioRef.current.blur()
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

  render () {
    const {children, className, style, onChange, disabled, checked, type, ...rest} = this.props
    const classes = classnames({
      [styles[`ufe-${type}-wrapper`]]: true,
      [styles['ufe-button-wrapper-checked']]: !!this.state.checked && type === 'button',
      [styles['ufe-button-wrapper-disabled']]: !!disabled && type === 'button'
    }, className)
    const radioClasses = classnames({
      [styles['ufe-radio']]: true,
      [styles['ufe-radio-checked']]: !!this.state.checked && type === 'radio',
      [styles['ufe-radio-disabled']]: !!disabled && type === 'radio'
    })
    return (
      <label className={classes} style={style}>
        <span className={radioClasses}>
          <input ref={this.radioRef} checked={!!this.state.checked} onChange={this.handleChange} className={styles['ufe-radio-input']} {...rest} type='radio' />
          <span className={styles['ufe-radio-inner']} />
        </span>
        {children !== undefined ? <span>{children}</span> : null}
      </label>
    )
  }
}

export default Radio
