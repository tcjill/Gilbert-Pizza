import React, { Component } from 'react'
import './style.css'

class List extends Component {
    


render() {
    // with destructuring you can do the same
    // as below but with less typing
    const {venues} = this.props;
     return (
        <ul>
          {venues.map((item, index) => {
            return <li className="venue-list-item" key={index}>{item.name}</li>
          })}
        </ul>
    )
  }
}
export default List

