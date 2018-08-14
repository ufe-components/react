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
    notFoundContent: PropTypes.string,
    mode: PropTypes.oneOf(['multiple', 'tags'])
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
  list = React.createRef()
  upItemIndex = 0
  downItemIndex = 7
  canDelete=true

  state = {
    visible: false,
    value: this.props.value ? this.props.value : this.props.defaultValue ? this.props.defaultValue : this.props.mode ? [] : '',
    inputValue: this.props.mode ? '' : this.props.value || this.props.defaultValue || '',
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

  handleItemClick = optionValue => {
    let value = optionValue
    let placeholder = this.state.placeholder
    let inputValue = ''
    if (this.props.mode) {
      let index = this.state.value.indexOf(value)
      if (index !== -1) {
        value = [...this.state.value]
        value.splice(index, 1)
      } else {
        value = [...this.state.value, value]
      }
      if (value.length > 0) {
        placeholder = ''
      } else {
        placeholder = this.props.placeholder
      }
    } else {
      inputValue = value
    }
    this.setState({
      value,
      placeholder,
      inputValue
    }, () => {
      if (this.props.onSelect) {
        this.props.onSelect(optionValue)
      }
      if (this.props.onChange) {
        this.props.onChange(optionValue)
      }
    })
  }

  handleInputChange = e => {
    let inputValue = e.target.value

    this.setState({
      inputValue,
      itemIndex: 0
    }, () => {
      this.canDelete = !this.state.inputValue
      this.upItemIndex = 0
      this.downItemIndex = 7
      if (this.props.onChange) {
        this.props.onChange(e.target.value)
      }
    })
  }

  keyboardSelect = e => {
    const children = this.getNestedChildren(this.props.children)
    const length = children.length
    let itemIndex = this.state.itemIndex
    if (e.keyCode === 38) { // up
      itemIndex--
      if (itemIndex < 0) itemIndex = length - 1
      if (itemIndex < this.upItemIndex) {
        this.list.current.scrollTop -= 32
        this.upItemIndex -= 1
        this.downItemIndex -= 1
      } else if (itemIndex === length - 1) {
        this.list.current.scrollTop = (length - 8) * 32 + 2
        this.downItemIndex = length - 1
        this.upItemIndex = length - 8
      }
    } else if (e.keyCode === 40) { // down
      itemIndex++
      if (itemIndex >= length) itemIndex = 0
      if (itemIndex > this.downItemIndex) {
        this.list.current.scrollTop += 32
        this.upItemIndex += 1
        this.downItemIndex += 1
      } else if (itemIndex === 0) {
        this.list.current.scrollTop = 2
        this.upItemIndex = 0
        this.downItemIndex = 7
      }
    } else if (e.keyCode === 13 && itemIndex >= 0 && itemIndex < length) {
      let value = children[itemIndex].props.value
      let placeholder = this.state.placeholder
      let inputValue = ''
      if (this.props.mode) {
        let index = this.state.value.indexOf(value)
        if (index !== -1) {
          value = [...this.state.value]
          value.splice(index, 1)
        } else {
          value = [...this.state.value, value]
        }
        if (value.length > 0) {
          placeholder = ''
        } else {
          placeholder = this.props.placeholder
        }
      } else {
        inputValue = value
      }
      this.setState({
        itemIndex,
        value,
        placeholder,
        inputValue
      }, () => {
        if (!this.props.mode) {
          this.tooltip.current.hide()
          this.input.current.blur()
        }
        if (this.props.onSelect) {
          this.props.onSelect(children[itemIndex].props.value)
        }
        if (this.props.onChange) {
          this.props.onChange(children[itemIndex].props.value)
        }
      })
      return
    } else if (e.keyCode === 27) {
      this.tooltip.current.hide()
      this.input.current.blur()
    } else if (e.keyCode === 8 && this.props.mode) {
      if (this.canDelete) {
        const value = this.state.value.slice(0, this.state.value.length - 1)
        let placeholder = value.length > 0 ? '' : this.props.placeholder
        this.setState({
          value,
          placeholder
        })
      }
    }
    this.setState({
      itemIndex
    })
  }

  getNestedChildren (children) {
    let ret = []
    React.Children.forEach(children, (child, index) => {
      if (child.type.displayName === 'OptionGroup') {
        ret = ret.concat(this.getNestedChildren(child.props.children))
      } else if (child.type.displayName === 'Option') {
        if (!child.props.disabled) {
          if (this.props.showSearch || this.props.mode) {
            if (this.props.filterOption(this.state.inputValue, child)) {
              ret.push(child)
            }
          } else {
            ret.push(child)
          }
        }
      }
    })
    return ret
  }

  getRenderedChildren (children, options) {
    return React.Children.map(children, child => {
      if (child.type.displayName === 'OptionGroup') {
        return React.cloneElement(child, {
          children: this.getRenderedChildren(child.props.children, options)
        })
      } else if (child.type.displayName === 'Option') {
        if ((this.props.showSearch || this.props.mode) && !this.props.filterOption(this.state.inputValue, child)) {
          return null
        }
        let index = options.findIndex(item => {
          return item.props.value === child.props.value
        })
        return React.cloneElement(child, {
          multiple: !!this.props.mode,
          onChange: this.handleItemClick,
          selectedValue: this.props.showSearch ? this.state.placeholder : this.state.value,
          isHover: !child.props.disabled && index === this.state.itemIndex,
          changeItemHover: this.changeItemHover
        })
      }
    })
  }

  removeHoverIndex = e => {
    this.setState({
      itemIndex: -1
    }, () => {
      this.upItemIndex = 0
      this.downItemIndex = 7
    })
  }

  changeItemHover = value => {
    const options = this.getNestedChildren(this.props.children)
    const itemIndex = options.findIndex(item => item.props.value === value)
    this.setState({
      itemIndex
    })
  }

  removeItem = (e, value) => {
    e.stopPropagation()
    const values = this.state.value.slice()
    const index = values.indexOf(value)
    values.splice(index, 1)
    let placeholder = values.length > 0 ? '' : this.props.placeholder
    this.setState({
      value: values,
      placeholder
    })
  }

  renderChildren = children => {
    const options = this.getNestedChildren(children)
    return (
      <CSSTransition in={this.state.visible} timeout={150} classNames={{
        enter: styles['ufe-select-list-enter'],
        enterActive: styles['ufe-select-list-enter-active'],
        exit: styles['ufe-select-list-exit'],
        exitActive: styles['ufe-select-list-exit-active']
      }} unmountOnExit>
        <ul ref={this.list} className={styles['ufe-selelct-list']} onMouseLeave={this.removeHoverIndex}>
          {
            options.length === 0
              ? <Option value='disabled' disabled>{this.props.notFoundContent}</Option>
              : this.getRenderedChildren(children, options)
          }
        </ul>
      </CSSTransition>
    )
  }

  handleBlur = e => {
    this.tooltip.current.hide()
  }

  render () {
    const {className, children, style, defaultValue, value, disabled, onChange, onSelect, showSearch, placeholder, optionFilterProp, filterOption, notFoundContent, mode, ...rest} = this.props

    const classes = classnames({
      [styles['ufe-select']]: true,
      [styles['ufe-select-selection']]: this.state.visible,
      [styles['ufe-select-disabled']]: disabled,
      [styles['ufe-select-multiple']]: !!mode
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

    const inputStyle = mode && this.state.value.length > 0 ? {
      maxWidth: '100%',
      width: this.state.inputValue ? this.state.inputValue.length * 12 : 12
    } : {}

    return (
      <Tooltip ref={this.tooltip} trigger='click' onShow={this.handleShow} onHide={this.handleHide} autoWidth contentClassName={contentClassName} showArrow={false} placement={placement} title={this.renderChildren(children)} hideAfterClick>
        <div onBlur={this.handleBlur} className={classes} {...rest} style={style}>
          {
            mode
              ? <ul className={styles['ufe-select-tags']}>
                {
                  this.state.value.map(item => {
                    return (
                      <li className={styles['ufe-select-tags-item']} key={item}>
                        <div className={styles['ufe-select-tags-item-content']}>{item}</div>
                        <Icon onClick={e => this.removeItem(e, item)} className={styles['ufe-select-tags-item-icon']} type='times' />
                      </li>
                    )
                  })
                }
                <input style={inputStyle} tabIndex={-1} readOnly={mode ? false : !showSearch} ref={this.input} className={styles['ufe-select-input']} placeholder={this.state.placeholder} onChange={this.handleInputChange} onKeyDown={this.keyboardSelect} value={this.state.inputValue} />
              </ul>
              : [
                <CSSTransition key='angle' in={this.state.visible} timeout={150} classNames={{
                  enter: styles['ufe-select-icon-enter'],
                  enterActive: styles['ufe-select-icon-enter-active'],
                  enterDone: styles['ufe-select-icon-enter-done'],
                  exit: styles['ufe-select-icon-exit'],
                  exitActive: styles['ufe-select-icon-exit-active'],
                  exitDone: styles['ufe-select-icon-exit-done']
                }}>
                  <Icon type='angle-down' />
                </CSSTransition>,
                <input key='input' style={inputStyle} tabIndex={-1} readOnly={mode ? false : !showSearch} ref={this.input} className={styles['ufe-select-input']} placeholder={this.state.placeholder} onChange={this.handleInputChange} onKeyDown={this.keyboardSelect} value={this.state.inputValue} />
              ]
          }

        </div>
      </Tooltip>
    )
  }
}

export default Select
