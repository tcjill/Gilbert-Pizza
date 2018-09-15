import React, { Component } from "react";
import "./style.css";

class List extends Component {
  state = {};

  handleClick = (id,title) => {
  this.props.showMarkerBox(this.props.markers[id],title)
}

  render() {
    // with destructuring you can do the same
    // as below but with less typing
    const { venues } = this.props;
       console.log(venues);
    return (
      <aside className="sidebar">
        <input
          aria-label="search field"
          type="text"
          placeholder="Search Places"
          value={this.props.query}
          onChange={event => this.props.updateQuery(event.target.value)}
          
        />
        <ul className="venue-list-parent">
          {venues
            .filter(
              filtered =>
                filtered.venue.name
                  .toLowerCase()
                  .indexOf(this.props.query.toLowerCase()) > -1
            )
            .map((item, index) => {
              return (
                <li tabIndex="0" className="venue-list-item" key={index} onClick={()=> this.handleClick(index,item.venue.name)}>
                 {item.venue.name}
                </li>
              );
            })}
        </ul>
      </aside>
    );
  }
}
export default List;
