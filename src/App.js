import React, { Component } from 'react';
import './App.css';

import axios from 'axios'

class App extends Component {

  state = {
    venues:[]
  }

  componentDidMount() {
    this.getVenues()
    this.renderMap()
    
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
      near:"Phoenix, AZ",
      v: "20181508"
    

    }
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues:response.data.response.groups[0].items
        }, this.renderMap())

      })
      /*.catch(error => {
        console.log("ERROR!!" = error)
      })*/
  }


  initMap = () => {

    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    })

    this.state.venues.map(venue =>{

      var marker = new window.google.maps.Marker({
        position: {lat: -34.397, lng: 150.644},
        map:map,
        
      })

    })

    var marker = new window.google.maps.Marker({
      position: {lat: -34.397, lng: 150.644},
      map:map,
      
    })
  }

  render() {
    return (
      <main>
        <div id="map"></div>
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
