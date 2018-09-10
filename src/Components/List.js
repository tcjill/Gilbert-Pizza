import React, { Component } from 'react'
import './style.css'

class List extends Component {
  state ={
    query:'',
    searchedBooks: []
  }
  updateQuery = (query) => {
    this.setState({query})
    
  }
  /*updateMarkers =() =>{
    this.props.markers
}*/
render() {
   
    // with destructuring you can do the same
    // as below but with less typing
    const {venues} = this.props;
    console.log(venues)
     return (
       <aside className="sidebar">
        <input aria-label="search field"
            type="text" 
            placeholder="Search Places"
            value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}
        />
          <ul className="venue-list-parent">
          
            {venues
              .filter(filtered => filtered.venue.name.toLowerCase().indexOf(this.state.query.toLowerCase()) > -1)
              .map((item, index) => {
                return <li tabIndex='0' className="venue-list-item" key={index}>{item.venue.name}</li>
            })}
          </ul>
        </aside>
    )
  }
}
export default List






//indexOfExample() {
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

//}
/*
                
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={this.state.query}
                            onChange={(event) => this.updateQuery(event.target.value)}
                            />
                   
                 

*/