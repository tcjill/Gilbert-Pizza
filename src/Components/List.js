import React, { Component } from "react";
 
class List extends Component {
  render() {
    return (
        <div>
          
          
            <li><a href="/">Home</a></li>
            <li><a href="/stuff">Stuff</a></li>
            <li><a href="/contact">Contact</a></li>
          
          <div className="content">
             
          </div>
        </div>
    );
  }
}
 
export default List;