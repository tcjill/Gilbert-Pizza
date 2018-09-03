import React, { Component } from 'react'
import './style.css'

class List extends Component {
    
indexOfExample() {
  // const listItem = 'Jill Gundaker\'s Pizza';
  // const search = 'Jill';

  // if (listItem.indexOf(search) >= 0) {
  //   console.log(`${search} is in ${listItem}`)
  // } else {
  //   console.log('Search was not found.')
  // }

  // // example 2
  // const fruits = ['apple', 'grape', 'banana'];
  // console.log('index of: ', fruits.indexOf('apple')); // 0
  // console.log('index of: ', fruits.indexOf('grape')); // 1
  // console.log('index of: ', fruits.indexOf('banana')); // 2
  // console.log('index of: ', fruits.indexOf('orange')); // -1

  // example 3
 // const states = ['Texas', 'Arizona', 'New Mexico', 'California', 'Arkansas', 'New Jersey', 'New York'];

  // pretend this is the input field, ignore this for now
  // const searchQuery = 'T';

  // const filteredState = states.filter(state => state.indexOf('New') > -1);

 // console.log('Filtered State', filteredState)

}

render() {
   
    // with destructuring you can do the same
    // as below but with less typing
    const {venues} = this.props;
    console.log(venues)
     return (
       <aside className="sidebar">
          <input type="text" className="search-input" placeholder="Search Places"/>
          <ul className="venue-list-parent">
            {venues
              .filter(filtered => filtered.venue.name.indexOf('') > -1)
              .map((item, index) => {
                return <li className="venue-list-item" key={index}>{item.venue.name}</li>
            })}
          </ul>
        </aside>
    )
  }
}
export default List

