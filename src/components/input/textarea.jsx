import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './index.styl'

const HIDDEN_TEXTAREA_STYLE = `
  min-height:0 !important;
  max-height:none !important;
  height:0 !important;
  visibility:hidden !important;
  overflow:hidden !important;
  position:absolute !important;
  z-index:-1000 !important;
  top:0 !important;
  right:0 !important
`

const SIZING_STYLE = [
  'letter-spacing',
  'line-height',
  'padding-top',
  'padding-bottom',
  'font-family',
  'font-weight',
  'font-size',
  'text-rendering',
  'text-transform',
  'width',
  'text-indent',
  'padding-left',
  'padding-right',
  'border-width',
  'box-sizing'
]

let hiddenTextarea

function calculateStyle (node) {
  const style = window.getComputedStyle(node)

  const boxSizing = (
    style.getPropertyValue('box-sizing') ||
    style.getPropertyValue('-moz-box-sizing') ||
    style.getPropertyValue('-webkit-box-sizing')
  )

  const paddingSize = (
    parseFloat(style.getPropertyValue('padding-bottom')) +
    parseFloat(style.getPropertyValue('padding-top'))
  )

  const borderSize = (
    parseFloat(style.getPropertyValue('border-bottom-width')) +
    parseFloat(style.getPropertyValue('border-top-width'))
  )

  const sizingStyle = SIZING_STYLE
    .map(name => `${name}:${style.getPropertyValue(name)}`)
    .join(';')

  return {
    sizingStyle,
    paddingSize,
    borderSize,
    boxSizing
  }
}

function calculateHeight (node, minRows, maxRows) {
  if (!hiddenTextarea) {
    hiddenTextarea = document.createElement('textarea')
    document.body.appendChild(hiddenTextarea)
  }

  let {
    paddingSize, borderSize,
    boxSizing, sizingStyle
  } = calculateStyle(node)

  hiddenTextarea.setAttribute('style', `${sizingStyle};${HIDDEN_TEXTAREA_STYLE}`)
  hiddenTextarea.value = node.value || node.placeholder || ''
  let minHeight = Number.MIN_SAFE_INTEGER
  let maxHeight = Number.MAX_SAFE_INTEGER
  let height = hiddenTextarea.scrollHeight
  let overflowY

  if (boxSizing === 'border-box') {
    height = height + borderSize
  } else if (boxSizing === 'content-box') {
    height = height - paddingSize
  }

  if (minRows != null || maxRows != null) {
    hiddenTextarea.value = ''
    let singleRowHeight = hiddenTextarea.scrollHeight - paddingSize
    if (minRows != null) {
      minHeight = minRows * singleRowHeight
      if (boxSizing === 'border-box') {
        minHeight = minHeight + paddingSize + borderSize
      }
      height = Math.max(height, minHeight)
    }

    if (maxRows != null) {
      maxHeight = singleRowHeight * maxRows
      if (boxSizing === 'border-box') {
        maxHeight = maxHeight + paddingSize + borderSize
      }
      height = Math.min(maxHeight, height)
    }
  }

  if (!maxRows) {
    overflowY = 'hidden'
  }

  return { height, minHeight, maxHeight, overflowY }
}

class Textarea extends Component {
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    style: PropTypes.object,
    autosize: PropTypes.oneOfType([PropTypes.bool, PropTypes.object])
  }

  state = {
    calculateStyle: {}
  }

  textareaRef = React.createRef()

  reCalculateHeight () {
    const { autosize } = this.props
    if (!autosize || !this.textareaRef.current) return
    const calculateStyle = calculateHeight(this.textareaRef.current, autosize.minRows, autosize.maxRows)
    this.setState({
      calculateStyle
    })
  }

  handleChange = e => {
    const { onChange } = this.props
    this.reCalculateHeight()
    if (typeof onChange === 'function') {
      onChange(e)
    }
  }

  componentDidMount () {
    this.reCalculateHeight()
  }

  render () {
    const { className, style, autosize, ...rest } = this.props
    const classes = classnames({
      [styles['ufe-input']]: true
    }, className)
    return (
      <textarea style={{...style, ...this.state.calculateStyle}} onChange={this.handleChange} ref={this.textareaRef} className={classes} {...rest} />
    )
  }
}

export default Textarea
