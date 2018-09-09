import React, { Component } from 'react';
import './App.css';

import List from './Components/List'
import axios from 'axios'

class App extends Component {

  state = {
    venues:[],
    markers:[]
    
    
  }

  componentDidMount() {
    this.getVenues()
   
    
  }


  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCuZz6ih06iC5i-yFxcpi4vzfi9qqIPiKo&callback=initMap")
    window.initMap = this.initMap

  }

  getVenues =() => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id:"JLIPFSTRQINS3SJWZEMHLLL20U0TYRV2RW5F4NOTEDXYAJVR",
      client_secret:"R4WNZB2KMVUKJGD5CAGFAUZVJNYJ1YWGILUJ5TN43UZPZ2ZJ",
      query:"food",
      near:"Gilbert, AZ",
      v: "20181508"
    

    }
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues:response.data.response.groups[0].items.filter(myVen => myVen.venue.categories[0].name === 'Pizza Place') 
          
        }, this.renderMap())

      })
      .catch(error => {
        console.log("ERROR!!" + error)
      })
  }

// create the map
  initMap = () => {

    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: 33.3343, lng: -111.7707},
      zoom: 12
      

    })
// making the info window
    var infoWindow = new window.google.maps.InfoWindow()
       
// display dynamic markers
    this.state.venues.map(myVenue =>{
      
      var contentString =`${myVenue.venue.name}`

// making a marker
      var marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat, lng: myVenue.venue.location.lng},
        map:map,
        animation: window.google.maps.Animation.DROP,
        title: myVenue.venue.name
        
      })
 // click on marker
      marker.addListener('click', function(){
        //change content inside
        infoWindow.setContent(contentString)



        //open info window
        infoWindow.open(map, marker)

        
       
        // Animate The Marker
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
            marker.setAnimation(window.google.maps.Animation.BOUNCE)
            setTimeout(function() {
            marker.setAnimation(null)
            },400)
              }        

      })     

    })

   
  }

    render() {
      this.state.venues.forEach(myVen=>
      console.log(''))
      return (
          <main className="container">
            <div id="map"></div>
            <List venues ={this.state.venues} 
              onClick={(name, coordinate) => {
              // call map api to select pin at coordinate or by name
              }}/>
          </main>  

        
     

    ) 
  }
}


function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement ("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}



 
export default App;
