import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './index.styl'
import Tooltip from '../tooltip'
import {withMenu} from './menu-context'
import Icon from '../icon'
import {CSSTransition} from 'react-transition-group'

class MenuSubMenu extends Component {
  static propTypes = {
    children: PropTypes.any,
    title: PropTypes.any,
    className: PropTypes.string,
    selectedKeys: PropTypes.array,
    id: PropTypes.string,
    itemClick: PropTypes.func,
    mode: PropTypes.string,
    isRecusive: PropTypes.bool,
    onOpenChange: PropTypes.func
  }

  static defaultProps = {
    isRecusive: false
  }

  state = {
    visible: true
  }

  handleShow = e => {
    e.keys = []
    if (this.props.mode === 'inline') {
      this.setState({
        visible: !this.state.visible
      })
    }
    this.props.onOpenChange && this.props.onOpenChange()
  }

  renderChildren (children) {
    children = React.Children.map(children, child => {
      return React.cloneElement(child, {
        isRecusive: this.props.mode === 'horizontal'
      })
    })
    return (
      <CSSTransition in={this.state.visible} timeout={150} classNames={{
        enter: styles['ufe-sub-menu-list-enter'],
        enterActive: styles['ufe-sub-menu-list-enter-active'],
        exit: styles['ufe-sub-menu-list-exit'],
        exitActive: styles['ufe-sub-menu-list-exit-active']
      }} unmountOnExit>
        <ul>
          {children}
        </ul>
      </CSSTransition>
    )
  }

  renderTitle (title) {
    const {selectedKeys, id} = this.props
    const classes = classNames({
      [styles['ufe-sub-menu-title']]: true,
      [styles['ufe-sub-menu-selected']]: selectedKeys && selectedKeys.indexOf(id) > -1
    })
    return (
      <div className={classes} onClick={this.handleShow}>
        {
          this.props.mode === 'vertical-right' && <Icon type='angle-left' />
        }
        <span>{title}</span>
        { this.props.mode === 'inline' &&
        <CSSTransition in={this.state.visible} timeout={150} classNames={{
          enter: styles['ufe-sub-menu-icon-enter'],
          enterActive: styles['ufe-sub-menu-icon-enter-active'],
          enterDone: styles['ufe-sub-menu-icon-enter-done'],
          exit: styles['ufe-sub-menu-icon-exit'],
          exitActive: styles['ufe-sub-menu-icon-exit-active'],
          exitDone: styles['ufe-sub-menu-icon-exit-done']
        }}>
          <Icon type='angle-up' />
        </CSSTransition>
        }
        {
          (this.props.mode === 'vertical' || this.props.isRecusive) && <Icon type='angle-right' />
        }
      </div>
    )
  }

  handleClick = e => {
    let keys = e.keys || []
    if (this.props.id) {
      if (keys.indexOf(this.props.id) > -1) {
        keys = []
      }
      keys.push(this.props.id)
      e.keys = keys
    }
  }

  render () {
    const {className, children, title, selectedKeys, id, itemClick, mode, isRecusive, onOpenChange, ...rest} = this.props

    const classes = classNames({
      [styles['ufe-sub-menu']]: true
    }, className)
    const contentClassName = classNames({
      [styles['ufe-menu-tooltip-content']]: true,
      [styles['ufe-menu-tooltip-content-right']]: mode === 'vertical-right'
    })
    let placement = mode === 'horizontal' ? 'bottom' : mode === 'vertical' ? 'right' : 'left'
    placement = isRecusive ? 'right' : placement
    return (
      <li {...rest} className={classes} onClickCapture={this.handleClick}>
        {
          mode === 'inline' && this.renderTitle(title)
        }
        {
          mode === 'inline' && this.renderChildren(children)
        }
        {
          mode !== 'inline' && <Tooltip autoWidth={mode === 'horizontal'} contentClassName={contentClassName} showArrow={false} placement={placement} title={this.renderChildren(children)} hideAfterClick>
            {this.renderTitle(title)}
          </Tooltip>
        }
      </li>
    )
  }
}

export default withMenu(MenuSubMenu)
