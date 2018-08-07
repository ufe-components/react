import React, { Component } from 'react'
import Rate from '../index'

class Demo extends Component {
  render () {
    return (
      <div>
        <div style={{margin: 10}}>
          <Rate value={2.5} style={{fontSize: 36}} />
        </div>
        <div style={{margin: 10}}>
          <Rate disabled value={1} style={{fontSize: 36}} />
        </div>
        <div style={{margin: 10}}>
          <Rate allowHalf={false} value={1} style={{fontSize: 36}} />
        </div>
        <div style={{margin: 10}}>
          <Rate allowClear={false} allowHalf={false} value={1} style={{fontSize: 36}} />
        </div>
      </div>
    )
  }
}

export default Demo
