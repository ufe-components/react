import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import styles from './index.styl'
import classNames from 'classnames'

class Popup extends Component {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.any,
    shouldToggle: PropTypes.func,
    childRect: PropTypes.func,
    placement: PropTypes.string,
    trigger: PropTypes.string,
    contentStyle: PropTypes.object,
    contentClassName: PropTypes.string,
    visible: PropTypes.bool,
    showArrow: PropTypes.bool,
    afterClickAction: PropTypes.func
  }

  static defaultProps = {
    title: 'pop up'
  }

  handleMouseLeave = e => {
    // e.stopPropagation()
    if (this.props.trigger === 'hover') {
      this.props.shouldToggle(false)
    }
  }

  handleMouseEnter = e => {
    // e.stopPropagation()
    if (this.props.trigger === 'hover') { this.props.shouldToggle(true) }
  }

  handleClick = (e) => {
    if (this.props.trigger === 'click') {
      e.stopPropagation()
    }
    if (this.props.trigger === 'hover') {
      this.props.shouldToggle(false)
    }
    if (this.props.visible) {
      this.props.afterClickAction()
    }
  }

  bindEvent () {
    const dom = findDOMNode(this)
    dom.addEventListener('click', this.handleClick)
  }

  unBindEvent () {
    const dom = findDOMNode(this)
    dom.removeEventListener('click', this.handleClick)
  }

  componentDidMount () {
    const dom = findDOMNode(this)
    this.props.childRect(dom.offsetWidth, dom.offsetHeight)
    this.bindEvent()
  }

  componentWillUnmount () {
    this.unBindEvent()
  }

  render () {
    const { title, className, shouldToggle, childRect, placement, trigger, contentClassName, contentStyle, visible, showArrow, afterClickAction, ...rest } = this.props
    const classes = classNames({
      [styles['ufe-popup']]: true,
      [styles['ufe-popup-zIndex']]: visible
    }, className)
    const arrowClass = classNames({
      [styles['ufe-tooltip-arrow']]: true,
      [styles[`ufe-tooltip-arrow-${placement}`]]: true
    })
    const contentClass = classNames({
      [styles['ufe-tooltip-content']]: true,
      [styles[`ufe-tooltip-content-${placement}`]]: true
    }, contentClassName)
    return (
      <div onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} className={classes} {...rest}>
        { showArrow ? <div className={arrowClass} /> : null}
        <div style={contentStyle} className={contentClass}>
          {title}
        </div>
      </div>
    )
  }
}

export default Popup
