import React from 'react'
import Carousel from '../index'
import styles from './index.styl'

class CarouselDemo extends React.Component {
  render () {
    return (
      <div className={styles.app}>
        <Carousel>
          <div className={styles.item} style={{backgroundColor: '#f00'}} />
          <div className={styles.item} style={{backgroundColor: '#0f0'}} />
          <div className={styles.item} style={{backgroundColor: '#00f'}} />
          <div className={styles.item} style={{backgroundColor: '#ff0'}} />
          <div className={styles.item} style={{backgroundColor: '#f0f'}} />
          <div className={styles.item} style={{backgroundColor: '#0ff'}} />
        </Carousel>
      </div>
    )
  }
}
export default CarouselDemo
