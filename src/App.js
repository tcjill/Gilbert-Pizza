import React, { Component } from "react";
import "./App.css";

import List from "./Components/List";
import axios from "axios";

window.gm_authFailure = () => {
  alert("Error, check your Google API key");
};
class App extends Component {
  state = {
    venues: [],
    markers: [],
    query: "",
   
    infoWindow:[]
    
    
  };
  
  componentDidMount() {
    this.getVenues();
    
  }
  
  updateQuery = query => {
    this.setState({ query });
      if(query.trim() === ""){
    this.state.markers.forEach(marker => marker.setVisible(true))
    return true;
      }else {
      let venues = this.state.venues.filter(venue => {
          return venue.venue.name.toLowerCase().indexOf(query.toLowerCase()) > -1
      })
      venues.forEach(item => this.state.markers.filter(marker => marker.id !== item.venue.name).map(falseMarker => falseMarker.setVisible(false)))
      venues.forEach(item => this.state.markers.filter(marker => marker.id === item.venue.name).map(trueMarker => trueMarker.setVisible(true)))
  }
    
  };  
  


  renderMap = () => {
    loadScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCuZz6ih06iC5i-yFxcpi4vzfi9qqIPiKo&callback=initMap"
    );
    window.initMap = this.initMap;
  };

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const parameters = {
      client_id: "JLIPFSTRQINS3SJWZEMHLLL20U0TYRV2RW5F4NOTEDXYAJVR",
      client_secret: "R4WNZB2KMVUKJGD5CAGFAUZVJNYJ1YWGILUJ5TN43UZPZ2ZJ",
      query: "food",
      near: "Gilbert, AZ",
      v: "20181508"
    };
    axios
      .get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState(
          {
            venues: response.data.response.groups[0].items.filter(
              myVen => myVen.venue.categories[0].name === "Pizza Place"
            )
          },
          this.renderMap()
        );
      })
      .catch(error => {
        alert("Error: Couldn't load data from Foursquare.");
        console.log("ERROR!!" + error);
      });
  };
  showMarkerBox = ( marker, contentString) => {
    this.state.infoWindow.setContent(contentString);
    
    this.state.infoWindow.open(this.state.map, marker);
    
    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(function() {
      marker.setAnimation(null);
    }, 400);
}
  
  

  // create the map
  initMap = () => {
    var map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 33.3343, lng: -111.7707 },
      zoom: 12
    });
    // making the info window
    var infoWindow = new window.google.maps.InfoWindow();
      this.setState({ map,infoWindow})

    // display dynamic markers
    let markers = this.state.venues.map(myVenue => {
      var contentString = `${myVenue.venue.name} @ ${myVenue.venue.location.address}`;

      // making a marker
      var marker = new window.google.maps.Marker({
        position: {
          lat: myVenue.venue.location.lat,
          lng: myVenue.venue.location.lng
        },
        map: map,
        id:myVenue.venue.name,
        animation: window.google.maps.Animation.DROP,
        title: myVenue.venue.name,
        address: myVenue.venue.location.address
      });
      // click on marker
      marker.addListener("click", () => {
        this.showMarkerBox(marker, contentString);
        

        // Animate The Marker
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(function() {
            marker.setAnimation(null);
          }, 400);
        }
      });
      return marker;
    });
    this.setState({ markers });
    
  };

  render() {
    this.state.venues.forEach(myVen => console.log(""));
    console.log(this.state.markers);
    
    return (
      <main className="container">
        <div id="map" role="application" aria-label="map" />
        
        <List
          venues={this.state.venues}
          query={this.state.query}
          markers={this.state.markers}
          updateQuery={this.updateQuery}
          showMarkerBox={this.showMarkerBox} 
           
          
          
        />
      </main>
    );
  }
}

function loadScript(url) {
  var index = window.document.getElementsByTagName("script")[0];
  var script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  script.onerror = "Google Maps Failed to Load-"
  index.parentNode.insertBefore(script, index);
  
}

export default App;
