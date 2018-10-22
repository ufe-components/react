import React from 'react'
import styles from './index.styl'
import classnames from 'classnames'

class Carousel extends React.Component {
  state = {
    width: 0
  }

  ulRef = React.createRef()

  componentDidMount () {
    const item = this.ulRef.current.children[0]
    console.log(item.offsetWidth)
  }

  renderChild () {
    return React.Children.map(this.props.children, child => {
      return <li className={styles.item}>{child}</li>
    })
  }

  render () {
    const {children, className, ...rest} = this.props
    const classes = classnames(
      {
        [styles['outer']]: true
      },
      className
    )
    return (
      <div className={classes} {...rest}>
        <ul ref={this.ulRef} className={styles.main}>
          {this.renderChild()}
        </ul>
      </div>
    )
  }
}
export default Carousel
