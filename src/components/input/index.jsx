import React, { Component } from 'react'
import styles from './index.styl'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Textarea from './textarea'

class Input extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    size: PropTypes.oneOf(['large', 'default', 'small']),
    addonBefore: PropTypes.node,
    addonAfter: PropTypes.node,
    prefix: PropTypes.node,
    suffix: PropTypes.node
  }

  static defaultProps = {
    size: 'default'
  }

  inputRef = React.createRef()

  focus () {
    this.inputRef.current.focus()
  }

  blur () {
    this.inputRef.current.blur()
  }

  renderAddonInput (children) {
    const { addonBefore, addonAfter, className, size } = this.props
    if (!addonBefore && !addonAfter) return React.cloneElement(children, {className: classNames(children.props.className, className)})
    const addonClass = classNames({
      [styles['ufe-input-addon']]: true,
      [styles[`ufe-input-addon-${size}`]]: true
    })
    const beforeSpan = addonBefore ? (<span className={addonClass}>{addonBefore}</span>) : null
    const afterSpan = addonAfter ? (<span className={addonClass}>{addonAfter}</span>) : null
    const classes = classNames({
      [styles['ufe-input-wrapper']]: true
    }, className)
    return (
      <span className={classes}>
        <span className={styles['ufe-input-group']}>
          {beforeSpan}
          {children}
          {afterSpan}
        </span>
      </span>
    )
  }

  renderIconInput (children) {
    const { prefix, suffix, className, size } = this.props
    if (!prefix && !suffix) return children

    const prefixSpan = prefix ? (<span className={styles['ufe-input-prefix']}>{prefix}</span>) : null
    const suffixSpan = suffix ? (<span className={styles['ufe-input-suffix']}>{suffix}</span>) : null
    const classes = classNames({
      [styles['ufe-input-affix-wrapper']]: true,
      [styles[`ufe-input-affix-wrapper-${size}`]]: true
    }, className)
    return (
      <span className={classes}>
        {prefixSpan}
        {children}
        {suffixSpan}
      </span>
    )
  }

  render () {
    const { className, children, size, addonBefore, addonAfter, ...rest } = this.props

    const classes = classNames({
      [styles['ufe-input']]: true,
      [styles[`ufe-input-${size}`]]: true
    })

    return this.renderAddonInput(
      this.renderIconInput(
        <input ref={this.inputRef} {...rest} className={classes} type='text' />
      )
    )
  }
}

Input.textarea = Textarea

export default Input
