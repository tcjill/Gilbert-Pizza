import React, { Component } from 'react'
import './style.css'

class List extends Component {
    createListItem = () => {
      const venues = this.props.venues
      let key = 0;
      return venues.map((item) => {
        return (
          <li
            onClick = {() => {this.props.onClick(item.venue.name, item.venue.coordinate)}}
             className ="venue-list-item"
              key= {key++}>
             <p className="venue-list-item-name">{item.venue.name}</p>
          </li>
        )
      })
  }


  render() {
    return (
          <ul className= 'venues-list-parent'>
          {/*add  items here*/}
            {this.createListItem()}
          </ul>
    )
  }
}
export default List














