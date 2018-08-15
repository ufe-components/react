import React, { Component } from 'react'
import { createPortal, findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import {CSSTransition} from 'react-transition-group'
import PopUp from './popup'
import styles from './index.styl'

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
    showArrow: PropTypes.bool,
    autoWidth: PropTypes.bool,
    onShow: PropTypes.func,
    onHide: PropTypes.func
  }

  static defaultProps = {
    mouseDelay: 0.1,
    placement: 'top',
    title: 'pop up',
    trigger: 'hover',
    contentStyle: {},
    showArrow: true,
    autoWidth: false
  }

  state = {
    visible: !!this.props.visible
  }

  _toggle = false

  pureHide = (e, cb) => {
    this.setState({
      visible: false
    }, () => {
      cb && typeof cb === 'function' && cb()
    })
  }

  pureShow = (e, cb) => {
    this.setState({
      visible: true
    }, () => {
      cb && typeof cb === 'function' && cb()
    })
  }

  hide = e => {
    this.setState({
      visible: false
    }, () => {
      if (typeof this.props.onHide === 'function') {
        this.props.onHide(e)
      }
    })
  }

  show = (e) => {
    e.stopPropagation()
    this.setState(() => ({
      visible: true
    }), () => {
      if (typeof this.props.onShow === 'function') {
        this.props.onShow(e)
      }
    })
  }

  leave = (e) => {
    if (this._toggle) return
    e.preventDefault()
    document.removeEventListener('click', this.leave)
    this.hide(e)
  }

  shouldToggle = (e, toggle) => {
    if (!this.state.visible) return
    this._toggle = toggle
    if (!this._toggle && this.state.visible) {
      this.hide(e)
    }
  }

  handleClickShow = (e) => {
    if (!this.state.visible) {
      document.addEventListener('click', this.handleClickHide)
      this.show(e)
    }
  }

  handleClickHide = (e) => {
    document.removeEventListener('click', this.handleClickHide)
    this.hide(e)
  }

  handleContextMenuShow = (e) => {
    document.addEventListener('contextmenu', this.noop)
    if (!this.state.visible) {
      document.addEventListener('click', this.handleContextMenuHide)
    }
    this.show(e)
  }

  handleContextMenuHide = (e) => {
    e.preventDefault()
    document.removeEventListener('contextmenu', this.noop)
    document.removeEventListener('click', this.handleContextMenuHide)
    this.hide(e)
  }

  noop = (e) => {
    e.stopPropagation()
    e.preventDefault()
  }

  bindEvent () {
    window.onresize = () => this.getComponent(this.props.placement)
    const dom = findDOMNode(this)
    if (this.props.trigger === 'hover') {
      dom.addEventListener('mouseenter', this.show)
      dom.addEventListener('mouseleave', this.leave)
    }
    // if (this.props.trigger === 'click') {
    //   dom.addEventListener('click', this.handleClickShow)
    // }
    if (this.props.trigger === 'focus') {
      dom.addEventListener('focusin', this.show)
      dom.addEventListener('focusout', this.leave)
    }
    if (this.props.trigger === 'contextMenu') {
      dom.addEventListener('contextmenu', this.handleContextMenuShow)
    }
  }

  unbindEvent () {
    window.onresize = null
    const dom = findDOMNode(this)
    if (this.props.trigger === 'hover') {
      dom.removeEventListener('mouseenter', this.show)
      dom.removeEventListener('mouseleave', this.leave)
    }
    // if (this.props.trigger === 'click') {
    //   dom.removeEventListener('click', this.handleClickShow)
    // }
    if (this.props.trigger === 'focus') {
      dom.removeEventListener('focusin', this.show)
      dom.removeEventListener('focusout', this.leave)
    }
    if (this.props.trigger === 'contextMenu') {
      dom.removeEventListener('contextmenu', this.handleContextMenuShow)
    }
  }

  componentDidMount () {
    this.bindEvent()
    this.componentDidUpdate({}, {visible: this.state.visible})
  }

  static getDerivedStateFromProps (props, state) {
    if (props.visible !== undefined && props.visible !== state.visible) {
      return {
        visible: props.visible
      }
    }
    return null
  }

  componentDidUpdate (prevProps, prevState) {
    const rect = findDOMNode(this).getBoundingClientRect()

    if (this._rect && this._rect.left === rect.left && this._rect.right === rect.right && this._rect.top === rect.top && this._rect.bottom === rect.bottom && this._rect.width === rect.width && this._rect.height === rect.height && prevState.visible === this.state.visible && prevProps.title === this.props.title) {
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
    this.unbindEvent()
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
    const scrollTop = window.pageYOffset
    const scrollLeft = window.pageXOffset
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
    if (placement.includes('top') && top <= 0) {
      // 转换到下面还是不够就放弃
      const bottom = window.innerHeight - this._rect.bottom
      if (height < bottom) {
        return this.computeSize(placement.replace('top', 'bottom'))
      }
    }
    if (placement.includes('bottom') && top >= window.innerHeight - height) {
      if (height < this._rect.top) {
        return this.computeSize(placement.replace('bottom', 'top'))
      }
    }
    if (placement.includes('left') && left <= 0) {
      const right = window.innerWidth - this._rect.right
      if (width < right) {
        return this.computeSize(placement.replace('left', 'right'))
      }
    }
    if (placement.includes('right') && left >= window.innerWidth - width) {
      if (width < this._rect.left) {
        return this.computeSize(placement.replace('right', 'left'))
      }
    }
    top += scrollTop
    left += scrollLeft
    return {top, left, placement}
  }

  getComponent () {
    const {top, left, placement} = this.computeSize(this.props.placement)
    const {trigger, title, contentClassName, contentStyle, showArrow, autoWidth} = this.props
    const width = autoWidth ? this._rect.width : 'auto'

    this._component = (
      <CSSTransition
        in={this.state.visible}
        timeout={150}
        classNames={{
          enter: styles['ufe-tooltip-pop-up-enter'],
          enterActive: styles['ufe-tooltip-pop-up-enter-active'],
          enterDone: styles['ufe-tooltip-pop-up-enter-done'],
          exit: styles['ufe-tooltip-pop-up-exit'],
          exitActive: styles['ufe-tooltip-pop-up-exit-active'],
          exitDone: styles['ufe-tooltip-pop-up-exit-done']
        }}
        mountOnEnter
        // unmountOnExit
      >
        <PopUp showArrow={showArrow} contentClassName={contentClassName} contentStyle={contentStyle} trigger={trigger} title={title} placement={placement} childRect={this.getChildSize} shouldToggle={this.shouldToggle} style={{left, top, width}} visible={this.state.visible} />
      </CSSTransition>
    )

    this.forceUpdate()
  }

  render () {
    const { children, mouseDelay, placement, title, trigger, contentClassName, contentStyle, onShow, onHide, visible, showArrow, autoWidth, ...rest } = this.props
    const container = document.body
    const portal = createPortal(
      this._component,
      container
    )
    const child = React.Children.only(children)
    const props = this.props.trigger === 'click'
      ? {onClick: this.handleClickShow} : {}

    const tooltip = React.cloneElement(child, {key: 'tooltip', ...props, ...rest})
    return [
      tooltip,
      portal
    ]
  }
}

export default ToolTip
