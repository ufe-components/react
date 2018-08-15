import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tooltip from '../tooltip'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import styles from './index.styl'
import classnames from 'classnames'
import Icon from '../icon'
import TagItem from './tag-item'
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
    placeholder: this.props.placeholder || '',
    additionTags: []
  }

  handleShow = e => {
    this.input.current.focus()
    if (this.props.showSearch) {
      let value = this.state.value
      let placeholder = value || this.state.placeholder
      this.setState({
        inputValue: '',
        placeholder,
        visible: true
      })
      return
    }
    this.setState({
      visible: true
    })
  }

  handleHide = e => {
    this.setState({
      visible: false
    })
  }

  afterHide = node => {
    if (this.props.showSearch) {
      let placeholder = this.props.placeholder
      let inputValue = this.state.value
      this.setState({
        placeholder,
        inputValue
      })
    }

    if (this.props.mode) {
      this.setState({
        inputValue: ''
      })
    }
  }

  handleItemClick = (e, optionValue) => {
    let value = optionValue
    let placeholder = this.state.placeholder
    let inputValue = ''
    if (this.props.mode) {
      e.stopPropagation()
      this.input.current.focus()
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
    if (!this.state.visible) {
      this.tooltip.current.pureShow(e)
    }
    this.setState({
      inputValue,
      itemIndex: 0,
      visible: true
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
    const children = this.getTotalChildren(this.props.children)
    const length = children.length
    let itemIndex = this.state.itemIndex
    if (e.keyCode === 38) { // up
      if (!this.state.visible) return
      e.preventDefault()
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
      this.setState({
        itemIndex
      })
    } else if (e.keyCode === 40) { // down
      if (!this.state.visible) {
        this.tooltip.current.handleClickShow(e)
        return
      }
      e.preventDefault()
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
      this.setState({
        itemIndex
      })
    } else if (e.keyCode === 13 && itemIndex >= 0 && itemIndex < length) { // enter
      if (!this.state.visible) {
        this.tooltip.current.handleClickShow(e)
        return
      }
      let value = children[itemIndex].props.value
      let placeholder = this.state.placeholder
      let additionTags = this.state.additionTags.slice()
      let inputValue = ''
      if (this.props.mode) {
        if (this.props.mode === 'tags' && children[itemIndex].isInput) {
          // add input into addition
          additionTags.push(this.state.inputValue)
        }
        let index = this.state.value.indexOf(value)
        if (index !== -1) {
          if (children[itemIndex].isAddition) {
            // remove from addition
            const additionIndex = additionTags.indexOf(value)
            additionTags.splice(additionIndex, 1)
          }
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
        inputValue,
        additionTags
      }, () => {
        if (!this.props.mode) {
          this.tooltip.current.hide()
          this.input.current.blur()
        } else {
          this.canDelete = true
        }
        if (this.props.onSelect) {
          this.props.onSelect(children[itemIndex].props.value)
        }
        if (this.props.onChange) {
          this.props.onChange(children[itemIndex].props.value)
        }
      })
    } else if (e.keyCode === 27) { // escape
      this.tooltip.current.handleClickHide(e)
      this.input.current.blur()
    } else if (e.keyCode === 8 && this.props.mode) { // back
      if (this.canDelete) {
        // check for is addition
        const additionTags = this.state.additionTags.slice()
        const additionIndex = additionTags.indexOf(this.state.value[this.state.value.length - 1])
        if (additionIndex !== -1) {
          additionTags.splice(additionIndex, 1)
        }

        const value = this.state.value.slice(0, this.state.value.length - 1)
        let placeholder = value.length > 0 ? '' : this.props.placeholder
        this.setState({
          value,
          placeholder,
          additionTags
        })
      }
    } else if (e.keyCode === 9 && (this.props.mode || this.props.showSearch)) { // tab
      this.tooltip.current.handleClickHide(e)
      this.input.current.blur()
    }
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

  getTotalChildren (children) {
    const options = this.getNestedChildren(children)
    const inputValue = this.state.inputValue
    const tags = this.state.additionTags
    if (this.props.mode === 'tags') {
      if (inputValue) {
        const index = options.findIndex(child => child.props.value === inputValue)
        const additionIndex = tags.indexOf(inputValue)
        if (index === -1 && additionIndex === -1) {
          options.unshift({props: {[this.props.optionFilterProp]: inputValue}, isInput: true})
        }
      }

      if (tags.length > 0) {
        tags.forEach(tag => {
          const option = {props: {[this.props.optionFilterProp]: tag}, isAddition: true}
          if (this.props.filterOption(inputValue, option)) {
            options.push(option)
          }
        })
      }
    }
    return options
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
    const options = this.getTotalChildren(this.props.children)
    const itemIndex = options.findIndex(item => item.props.value === value)
    this.setState({
      itemIndex
    })
  }

  removeItem = (e, value) => {
    e.stopPropagation()
    const additionTags = this.state.additionTags.slice()
    const additionIndex = additionTags.indexOf(value)
    if (additionIndex !== -1) {
      additionTags.splice(additionIndex, 1)
    }
    const values = this.state.value.slice()
    const index = values.indexOf(value)
    values.splice(index, 1)
    let placeholder = values.length > 0 ? '' : this.props.placeholder
    if (this.state.visible) {
      this.input.current.focus()
    }
    this.setState({
      value: values,
      placeholder,
      additionTags
    })
  }

  getInputValueOption () {
    const inputValue = this.state.inputValue
    const nestedValues = this.getNestedChildren(this.props.children)
    const tags = this.state.additionTags
    if (!inputValue) return null
    const index = nestedValues.findIndex(child => child.props.value === inputValue)
    const additionIndex = tags.indexOf(inputValue)
    if (index === -1 && additionIndex === -1) {
      return (
        <Option multiple onChange={this.handleItemClick} selectedValue={this.state.value} changeItemHover={this.changeItemHover} isHover={this.state.itemIndex === 0} key={inputValue} value={inputValue}>{inputValue}</Option>
      )
    } else {
      return null
    }
  }

  getAdditionChildren () {
    const children = this.getTotalChildren(this.props.children)

    return this.state.additionTags.map(tag => {
      const option = {props: {[this.props.optionFilterProp]: tag}, isAddition: true}
      if (this.props.filterOption(this.state.inputValue, option)) {
        const index = children.findIndex(child => child.props.value === tag)
        return (
          <Option multiple onChange={this.handleItemClick} selectedValue={this.state.value} changeItemHover={this.changeItemHover} isHover={this.state.itemIndex === index} key={tag} value={tag}>{tag}</Option>
        )
      }
    })
  }

  renderChildren = children => {
    const options = this.getTotalChildren(children)
    return (
      <CSSTransition in={this.state.visible} timeout={150} classNames={{
        enter: styles['ufe-select-list-enter'],
        enterActive: styles['ufe-select-list-enter-active'],
        exit: styles['ufe-select-list-exit'],
        exitActive: styles['ufe-select-list-exit-active']
      }} onExited={this.afterHide} unmountOnExit>
        <ul ref={this.list} className={styles['ufe-selelct-list']} onMouseLeave={this.removeHoverIndex}>
          {
            this.props.mode === 'tags'
              ? [
                this.getInputValueOption(),
                this.getRenderedChildren(children, options),
                this.getAdditionChildren()
              ]
              : options.length === 0
                ? <Option value='disabled' disabled>{this.props.notFoundContent}</Option>
                : this.getRenderedChildren(children, options)
          }
        </ul>
      </CSSTransition>
    )
  }

  handleItemExit = node => {
    if (this.state.value.length === 0) {
      this.input.current.style.width = 0
    }
    this.input.current.blur()
  }

  handleItemExited = node => {
    if (this.state.value.length === 0) {
      this.input.current.style.width = '100%'
    }
    this.input.current.focus()
  }

  handleBlur = e => {
    if (!this.props.mode && this.state.visible) {
      this.tooltip.current.handleClickHide(e)
    }
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
      <Tooltip ref={this.tooltip} trigger='click' onShow={this.handleShow} onHide={this.handleHide} autoWidth contentClassName={contentClassName} showArrow={false} placement={placement} title={this.renderChildren(children)}>
        <div className={classes} {...rest} style={style}>
          {
            mode
              ? <ul className={styles['ufe-select-tags']}>
                <TransitionGroup component={null} >
                  {
                    this.state.value.map(item => {
                      return (
                        <CSSTransition onExit={this.handleItemExit} onExited={this.handleItemExited} key={item} timeout={300} classNames={{
                          enter: styles['ufe-select-tags-item-move-enter'],
                          enterActive: styles['ufe-select-tags-item-move-enter-active'],
                          exit: styles['ufe-select-tags-item-move-exit'],
                          exitActive: styles['ufe-select-tags-item-move-exit-active']
                        }}>
                          <TagItem item={item} removeItem={this.removeItem} />
                        </CSSTransition>
                      )
                    })
                  }
                </TransitionGroup>
                <input onBlur={this.handleBlur} style={inputStyle} readOnly={mode ? false : !showSearch} ref={this.input} className={styles['ufe-select-input']} placeholder={this.state.placeholder} onChange={this.handleInputChange} onKeyDown={this.keyboardSelect} value={this.state.inputValue} />
              </ul>
              : [
                <CSSTransition key='angle' in={this.state.visible} timeout={{enter: 300, exit: 150}} classNames={{
                  enter: styles['ufe-select-icon-enter'],
                  enterActive: styles['ufe-select-icon-enter-active'],
                  enterDone: styles['ufe-select-icon-enter-done'],
                  exit: styles['ufe-select-icon-exit'],
                  exitActive: styles['ufe-select-icon-exit-active'],
                  exitDone: styles['ufe-select-icon-exit-done']
                }}>
                  <Icon type='angle-down' />
                </CSSTransition>,
                <input onBlur={this.handleBlur} key='input' style={inputStyle} readOnly={mode ? false : !showSearch} ref={this.input} className={styles['ufe-select-input']} placeholder={this.state.placeholder} onChange={this.handleInputChange} onKeyDown={this.keyboardSelect} value={this.state.inputValue} />
              ]
          }

        </div>
      </Tooltip>
    )
  }
}

export default Select
