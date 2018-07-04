import React, { Component } from 'react'
import { createPortal, findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import PopUp from './popup'

class ToolTip extends Component {
  static propTypes = {
    children: PropTypes.any,
    mouseDelay: PropTypes.number,
    placement: PropTypes.oneOf(['top', 'left', 'right', 'bottom', 'topLeft', 'topRight', 'bottomLeft', 'bottomRight', 'leftTop', 'leftBottom', 'rightTop', 'rightBottom']),
    title: PropTypes.any,
    trigger: PropTypes.oneOf(['hover', 'click', 'focus', 'contextMenu']),
    contentClassName: PropTypes.string,
    contentStyle: PropTypes.object,
    visible: PropTypes.bool,
    onVisibleChange: PropTypes.func
  }

  static defaultProps = {
    mouseDelay: 0.1,
    placement: 'top',
    title: 'pop up',
    trigger: 'hover',
    contentStyle: {}
  }

  state = {
    visible: this.props.visible
  }

  _toggle = false

  show = (e) => {
    e.stopPropagation()
    this.setState(() => ({
      visible: true
    }), () => {
      this.props.onVisibleChange(this.state.visible)
    })
  }

  leave = (e) => {
    if (this._toggle) return
    e.preventDefault()
    document.body.removeEventListener('click', this.leave)
    this.setState(() => ({
      visible: false
    }), () => {
      this.props.onVisibleChange(this.state.visible)
    })
  }

  shouldToggle = (toggle) => {
    if (!this.state.visible) return
    this._toggle = toggle
    if (!this._toggle && this.state.visible) {
      this.setState(() => ({
        visible: false
      }), () => {
        this.props.onVisibleChange(this.state.visible)
      })
    }
  }

  handleClickShow = (e) => {
    e.stopPropagation()
    if (!this.state.visible) {
      document.body.addEventListener('click', this.handleClickHide)
    }
    this.setState({
      visible: !this.state.visible
    }, () => {
      this.props.onVisibleChange(this.state.visible)
    })
  }

  handleClickHide = (e) => {
    e.preventDefault()
    document.body.removeEventListener('click', this.handleClickHide)
    this.setState(() => ({
      visible: false
    }), () => {
      this.props.onVisibleChange(this.state.visible)
    })
  }

  handleContextMenuShow = (e) => {
    document.body.addEventListener('contextmenu', this.noop)
    if (!this.state.visible) {
      document.body.addEventListener('click', this.handleContextMenuHide)
    }
    this.setState(() => ({
      visible: true
    }), () => {
      this.props.onVisibleChange(this.state.visible)
    })
  }

  handleContextMenuHide = (e) => {
    e.preventDefault()
    document.body.removeEventListener('contextmenu', this.noop)
    document.body.removeEventListener('click', this.handleContextMenuHide)
    this.setState(() => ({
      visible: false
    }), () => {
      this.props.onVisibleChange(this.state.visible)
    })
  }

  noop = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  bindEvent () {
    const dom = findDOMNode(this)
    if (this.props.trigger === 'hover') {
      dom.addEventListener('mouseenter', this.show)
      dom.addEventListener('mouseleave', this.leave)
    }
    if (this.props.trigger === 'click') {
      dom.addEventListener('click', this.handleClickShow)
    }
    if (this.props.trigger === 'focus') {
      dom.addEventListener('focusin', this.show)
      dom.addEventListener('focusout', this.leave)
    }
    if (this.props.trigger === 'contextMenu') {
      dom.addEventListener('contextmenu', this.handleContextMenuShow)
    }
  }

  unbindEvent () {
    const dom = findDOMNode(this)
    if (this.props.trigger === 'hover') {
      dom.removeEventListener('mouseenter', this.show)
      dom.removeEventListener('mouseleave', this.leave)
    }
    if (this.props.trigger === 'click') {
      dom.removeEventListener('click', this.handleClickShow)
    }
    if (this.props.trigger === 'focus') {
      dom.removeEventListener('focusin', this.show)
      dom.removeEventListener('focusout', this.leave)
    }
    if (this.props.trigger === 'contextMenu') {
      dom.removeEventListener('contextmenu', this.handleContextMenuShow)
    }
  }

  componentDidMount () {
    if (this.props.visible === undefined) {
      this.bindEvent()
    }
    this.componentDidUpdate({}, {visible: this.state.visible})
  }

  static getDerivedStateFromProps (props, state) {
    if (props.visible !== state.visible) {
      return {
        visible: props.visible
      }
    }
    return null
  }

  componentDidUpdate (_, prevState) {
    const rect = findDOMNode(this).getBoundingClientRect()

    if (this._rect && this._rect.left === rect.left && this._rect.right === rect.right && this._rect.top === rect.top && this._rect.bottom === rect.bottom && this._rect.width === rect.width && this._rect.height === rect.height && prevState.visible === this.state.visible) {
      return
    }

    this._rect = rect
    if (this.props.mouseDelay) {
      this.clearDelayTimer()
      this.delayTimer = setTimeout(() => {
        this.getComponent()
        this.clearDelayTimer()
      }, this.props.mouseDelay * 1000)
    }
  }

  clearDelayTimer () {
    if (this.delayTimer) {
      clearTimeout(this.delayTimer)
      this.delayTimer = null
    }
  }

  componentWillUnmount () {
    if (this.props.visible === undefined) {
      this.unbindEvent()
    }
  }

  getChildSize = (width, height) => {
    this._tooltip = {
      width,
      height
    }
    this.getComponent()
  }

  computeSize (placement) {
    const width = this._tooltip ? this._tooltip.width : 0
    const height = this._tooltip ? this._tooltip.height : 0
    let top = 0
    let left = 0
    switch (placement) {
      case 'top':
        top = this._rect.top - height
        left = this._rect.left + this._rect.width / 2 - width / 2
        break
      case 'left':
        top = this._rect.top + this._rect.height / 2 - height / 2
        left = this._rect.left - width
        break
      case 'right':
        top = this._rect.top + this._rect.height / 2 - height / 2
        left = this._rect.left + this._rect.width
        break
      case 'bottom':
        top = this._rect.top + this._rect.height
        left = this._rect.left + this._rect.width / 2 - width / 2
        break
      case 'topLeft':
        top = this._rect.top - height
        left = this._rect.left
        break
      case 'topRight':
        top = this._rect.top - height
        left = this._rect.left + this._rect.width - width
        break
      case 'bottomLeft':
        top = this._rect.top + this._rect.height
        left = this._rect.left
        break
      case 'bottomRight':
        top = this._rect.top + this._rect.height
        left = this._rect.left + this._rect.width - width
        break
      case 'leftTop':
        top = this._rect.top
        left = this._rect.left - width
        break
      case 'leftBottom':
        top = this._rect.top + this._rect.height - height
        left = this._rect.left - width
        break
      case 'rightTop':
        top = this._rect.top
        left = this._rect.left + this._rect.width
        break
      case 'rightBottom':
        top = this._rect.top + this._rect.height - height
        left = this._rect.left + this._rect.width
        break
    }
    if (placement.includes('top') || placement.includes('bottom')) {
      if (top <= 0) {
        return this.computeSize(placement.replace('top', 'bottom'))
      }
      if (top >= window.innerHeight - height) {
        return this.computeSize(placement.replace('bottom', 'top'))
      }
    }
    if (placement.includes('left') || placement.includes('right')) {
      if (left <= 0) {
        return this.computeSize(placement.replace('left', 'right'))
      }
      if (left >= window.innerWidth - width) {
        return this.computeSize(placement.replace('right', 'left'))
      }
    }
    return {top, left, placement}
  }

  getComponent () {
    const {top, left, placement} = this.computeSize(this.props.placement)
    const {trigger, title, contentClassName, contentStyle, visible} = this.props
    const opacity = this.state.visible ? 1 : 0
    const transform = `scale(${this.state.visible ? 1 : 0.8})`
    this._component = (
      <PopUp contentClassName={contentClassName} contentStyle={contentStyle} trigger={trigger} title={title} placement={placement} childRect={this.getChildSize} shouldToggle={this.shouldToggle} style={{left, top, transform, opacity}} visible={visible} />
    )

    this.forceUpdate()
  }

  render () {
    const { children, mouseDelay, placement, title, trigger, contentClassName, contentStyle, onVisibleChange, visible, ...rest } = this.props
    const container = document.body
    const portal = createPortal(
      this._component,
      container
    )
    const child = React.Children.only(children)
    const tooltip = React.cloneElement(child, {key: 'tooltip', ...rest})
    return [
      tooltip,
      portal
    ]
  }
}

export default ToolTip
