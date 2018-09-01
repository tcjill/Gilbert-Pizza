import React, { Component } from 'react'
import './style.css'

class List extends Component {
    


render() {
    // with destructuring you can do the same
    // as below but with less typing
    const {venues} = this.props;
     return (
       <aside className="sidebar">
          <input type="text" className="search-input" placeholder="Search Places"/>
          <ul className="venue-list-parent">
            {venues.map((item, index) => {
              return <li className="venue-list-item" key={index}>{item.venue.name}</li>
            })}
          </ul>
        </aside>
    )
  }
}
export default List

