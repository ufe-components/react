import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tooltip from '../tooltip'
import { CSSTransition } from 'react-transition-group'
import styles from './index.styl'
import classnames from 'classnames'
import Icon from '../icon'
import Option from './option'

class Select extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.number)]),
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.number)]),
    disabled: PropTypes.bool,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    showSearch: PropTypes.bool,
    placeholder: PropTypes.string,
    optionFilterProp: PropTypes.string,
    filterOption: PropTypes.func,
    notFoundContent: PropTypes.string
  }

  static defaultProps = {
    notFoundContent: '无匹配结果',
    optionFilterProp: 'value',
    filterOption: function (input, option) {
      if (!input) return true
      return option.props[this.optionFilterProp].toLowerCase().indexOf(input.toLowerCase()) !== -1
    }
  }

  tooltip = React.createRef()
  input = React.createRef()

  state = {
    visible: false,
    value: this.props.value || this.props.defaultValue || '',
    itemIndex: 0,
    placeholder: this.props.placeholder || ''
  }

  handleShow = e => {
    if (this.props.showSearch) {
      let value = this.state.value
      let placeholder = value || this.state.placeholder
      this.setState({
        visible: true,
        value: '',
        placeholder
      })
      return
    }
    this.setState({
      visible: true
    })
  }

  handleHide = e => {
    if (this.props.showSearch) {
      const values = React.Children.map(this.props.children, child => {
        return child.props.value
      })
      let value = this.state.value
      let placeholder = this.props.placeholder

      if (values.indexOf(value) === -1) {
        if (values.indexOf(this.state.placeholder) !== -1) {
          value = this.state.placeholder
        } else {
          value = ''
        }
      }

      this.setState({
        visible: false,
        placeholder,
        value
      })
      return
    }
    this.setState({
      visible: false
    })
  }

  handleItemClick = value => {
    this.setState({
      value
    }, () => {
      if (this.props.onSelect) {
        this.props.onSelect(value)
      }
      if (this.props.onChange) {
        this.props.onChange(value)
      }
    })
  }

  handleInputChange = e => {
    this.setState({
      value: e.target.value,
      itemIndex: 0
    })
  }

  keyboardSelect = e => {
    const children = this.getRenderedChildren()
    const length = children.length
    let itemIndex = this.state.itemIndex
    if (e.keyCode === 38) { // up
      itemIndex--
      if (itemIndex < 0) itemIndex = length - 1
    } else if (e.keyCode === 40) { // down
      itemIndex++
      if (itemIndex >= length) itemIndex = 0
    } else if (e.keyCode === 13 && itemIndex >= 0 && itemIndex < length) {
      let value = children[itemIndex].props.value
      if (value !== this.state.value) {
        this.setState({
          itemIndex,
          value
        }, () => {
          this.tooltip.current.hide()
          this.input.current.blur()
        })
        return
      }
    }
    this.setState({
      itemIndex
    })
  }

  getRenderedChildren () {
    return React.Children.map(this.props.children, child => {
      if (this.props.showSearch && !this.props.filterOption(this.state.value, child)) {
        return null
      }
      return child
    })
  }

  removeHoverIndex = e => {
    this.setState({
      itemIndex: -1
    })
  }

  renderChildren = children => {
    let renderChildren = React.Children.map(children, child => {
      if (this.props.showSearch && !this.props.filterOption(this.state.value, child)) {
        return null
      }
      return React.cloneElement(child, {
        onChange: this.handleItemClick,
        selectedValue: this.state.value
      })
    })
    return (
      <CSSTransition in={this.state.visible} timeout={150} classNames={{
        enter: styles['ufe-select-list-enter'],
        enterActive: styles['ufe-select-list-enter-active'],
        exit: styles['ufe-select-list-exit'],
        exitActive: styles['ufe-select-list-exit-active']
      }} unmountOnExit>
        <ul className={styles['ufe-selelct-list']} onMouseEnter={this.removeHoverIndex}>
          {
            renderChildren.length === 0
              ? <Option value='disabled' disabled>{this.props.notFoundContent}</Option>
              : React.Children.map(renderChildren, (child, index) => {
                return React.cloneElement(child, {
                  isHover: index === this.state.itemIndex
                })
              })
          }
        </ul>
      </CSSTransition>
    )
  }

  render () {
    const {className, children, style, defaultValue, value, disabled, onChange, onSelect, showSearch, placeholder, optionFilterProp, filterOption, notFoundContent, ...rest} = this.props

    const classes = classnames({
      [styles['ufe-select']]: true,
      [styles['ufe-select-selection']]: this.state.visible,
      [styles['ufe-select-disabled']]: disabled
    }, className)
    const contentClassName = classnames({
      [styles['ufe-select-tooltip-content']]: true
    })
    let placement = 'bottom'

    if (disabled) {
      return (
        <div className={classes} {...rest} style={style}>
          <span>{this.state.value}</span>
          <Icon type='angle-down' />
        </div>
      )
    }

    return (
      <Tooltip ref={this.tooltip} trigger='click' onShow={this.handleShow} onHide={this.handleHide} autoWidth contentClassName={contentClassName} showArrow={false} placement={placement} title={this.renderChildren(children)} hideAfterClick>
        <div className={classes} {...rest} style={style}>
          {
            showSearch
              ? <input ref={this.input} className={styles['ufe-select-input']} placeholder={this.state.placeholder} onChange={this.handleInputChange} onKeyUp={this.keyboardSelect} value={this.state.value} />
              : <span>{this.state.value}</span>
          }
          <CSSTransition in={this.state.visible} timeout={150} classNames={{
            enter: styles['ufe-select-icon-enter'],
            enterActive: styles['ufe-select-icon-enter-active'],
            enterDone: styles['ufe-select-icon-enter-done'],
            exit: styles['ufe-select-icon-exit'],
            exitActive: styles['ufe-select-icon-exit-active'],
            exitDone: styles['ufe-select-icon-exit-done']
          }}>
            <Icon type='angle-down' />
          </CSSTransition>
        </div>
      </Tooltip>
    )
  }
}

export default Select
