import React from 'react'
import styles from './index.styl'
import classnames from 'classnames'
import PropTypes from 'prop-types'

class Carousel extends React.Component {
  static defaultProps = {
    autoPlay: true,
    interval: 5000,
    showDots: true
  }

  static propTypes = {
    autoPlay: PropTypes.bool,
    interval: PropTypes.number,
    showDots: PropTypes.bool
  }

  state = {
    width: 0,
    index: 1,
    visible: false
  }

  ulRef = React.createRef()

  componentDidMount () {
    const item = this.ulRef.current.children[0]
    this.setState({
      width: item.offsetWidth
    })
    this.startTimer()
  }

  componentWillUnmount () {
    this.this.stopTimer()
  }

  handleEnter = () => {
    this.setState({
      visible: true
    })
    this.stopTimer()
  }

  handleLeave = () => {
    this.setState({
      visible: false
    })
    this.startTimer()
  }

  startTimer () {
    if (this.props.autoPlay) {
      this.timer = setInterval(() => {
        this.changeView(this.state.index + 1)
      }, this.props.interval)
    }
  }

  stopTimer () {
    if (this.props.autoPlay) {
      clearInterval(this.timer)
      this.timer = null
    }
  }

  changeView (index) {
    const length = React.Children.count(this.props.children)

    if (index === 0) {
      index = length
      this.ulRef.current.style.transition = 'none'
      this.ulRef.current.style.left = -(length + 1) * this.state.width + 'px'
      this.ulRef.current.offsetWidth // eslint-disable-line
      this.ulRef.current.style.transition = 'left .8s ease-in-out'
    } else if (index === length + 1) {
      this.ulRef.current.style.transition = 'none'
      this.ulRef.current.style.left = '0px'
      this.ulRef.current.offsetWidth // eslint-disable-line
      this.ulRef.current.style.transition = 'left .8s ease-in-out'
      index = 1
    }

    this.setState({
      index
    })
  }

  renderChild () {
    const length = React.Children.count(this.props.children)
    const children = React.Children.map(this.props.children, child => {
      return <li className={styles.item}>{child}</li>
    })
    children.push(
      <li key={0} className={styles.item}>
        {this.props.children[0]}
      </li>
    )
    children.unshift(
      <li key={length} className={styles.item}>
        {this.props.children[length - 1]}
      </li>
    )
    return children
  }

  renderDots () {
    return React.Children.map(this.props.children, (child, index) => {
      const classes = classnames({
        [styles['dot']]: true,
        [styles['dot-active']]: this.state.index === index + 1
      })
      return (
        <li onClick={() => this.changeView(index + 1)} className={classes} />
      )
    })
  }

  render () {
    const {
      children,
      className,
      autoPlay,
      interval,
      showDots,
      ...rest
    } = this.props
    const { width, index, visible } = this.state
    const length = React.Children.count(children) + 2
    const classes = classnames(
      {
        [styles['outer']]: true
      },
      className
    )
    return (
      <div
        style={{ width: width }}
        className={classes}
        {...rest}
        onMouseEnter={this.handleEnter}
        onMouseLeave={this.handleLeave}
      >
        <ul
          style={{ width: width * length, left: -index * this.state.width }}
          ref={this.ulRef}
          className={styles.main}
        >
          {this.renderChild()}
        </ul>
        {showDots ? <ul className={styles.dots}>{this.renderDots()}</ul> : null}
        <div
          className={styles.left}
          onClick={() => this.changeView(index - 1)}
          style={{ opacity: visible ? 1 : 0 }}
        >
          <i className='fa fa-angle-left' />
        </div>
        <div
          className={styles.right}
          onClick={() => this.changeView(index + 1)}
          style={{ opacity: visible ? 1 : 0 }}
        >
          <i className='fa fa-angle-right' />
        </div>
      </div>
    )
  }
}
export default Carousel
