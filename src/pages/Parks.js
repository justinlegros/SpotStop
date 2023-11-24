import React from "react";
import {useEffect} from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import logo from "../images/skatespotblue.png";
import park from "../images/conti.jpeg";
import "./Parks.css";
import { Link } from "react-router-dom";
import MapStyles from "../mapStyles"
import icon from "../images/skateboard.svg"
import compass from "../images/compass.svg"
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import axios from "axios";

import { PropTypes } from 'react'

import Popup from "../components/Popup";

import "@reach/combobox/styles.css"

import Compnent from "./adf";

// import Popup from "../components/Popup";

import myFunction from "../components/test";



// <Link to="/"> <img className="logo" src={logo} alt="" logo></img> </Link>

//     marker button -> function (creates popup) -> pop up form


const libraries = ["places"];

const mapContainerStyle = {
  top: "8vh",
  left: "50%",
  width: "0",
  height: "92vh",
  transition: ""
};
const center = {
  lat: 18.611881701160286,
  lng: -13.257394557139039,
};

const options = {
  styles: MapStyles,
  disableDefaultUI: true,
  zoomControl: true,
  mapTypeControl: true,
}

const markersList = [];



function Poppy(input) {
    
  return
}

var temp = "Results";

export default function Parks() {

  const [isActive, setIsActive] = React.useState(false);

  const handleClick = event => {
    var elem = document.getElementById('main');
    var check = elem.classList.contains("results-ul-active");
    
    // 👇️ toggle isActive state on click
    setIsActive(current => !current);
    if (event.currentTarget.classList.contains("results-ul")) {
        var temp = document.getElementsByClassName("results-ul-active");
        for (var i = 0; i < temp.length; i++) {
          temp.item(i).className = "results-ul";
        }
        event.currentTarget.classList.remove('results-ul');
        event.currentTarget.classList.add('results-ul-active');
    }
  };

  const { isLoaded, loaderror} = useLoadScript ({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      libraries,
  });

  var fetchListHold = (function() {
    var executed = false;
    return function() {
        if (!executed) {
          fetchList();
            executed = true;
            // do something
        }
    };
})();
  
  const sendServerList = async (markerSen) => {
    let req = new XMLHttpRequest();

    req.onreadystatechange = (markerTemp) => {
      if (req.readyState == XMLHttpRequest.DONE) {
        console.log(req.responseText);
      }
    };

    req.open("ADD", "https://api.jsonbin.io/v3/b/655e788e54105e766fd3be2c", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", "$2a$10$Biuse.c0h9wCBq4UrVBho.b5W2Zu8owD1.2vCB3qqZCpY.yrx7eNO");
    console.log(markerSen)
    req.send('{"sample": "Testing"}');
  }

  /* [{"name":"Server Test","desc":"Click Icon/Edit to change info","lat":32.242897,"lng":-110.958477,"time":"Test","img":"/SpotStop/static/media/conti.46f2e19dad5d5c6b5c1e.jpeg"}]},"metadata":{"id":"655e788e54105e766fd3be2c","private":false,"createdAt":"2023-11-22T21:54:22.233Z"}}
  */
  const fetchList = async () => {
    const res = await axios.get("https://api.jsonbin.io/v3/b/655e788e54105e766fd3be2c");
    var marks = res.data.record.markersServer;
    marks.forEach(m => { 
      markers.push(m);
    })
    setSelected(markers[0]);
    setSelected(null);
  }

  const [selected, setSelected] = React.useState(null);

  const [markers, setMarkers] = React.useState([]);

  const [buttonPopup, setButtonPopup] = React.useState(false);

  const onMapClick = React.useCallback( (event) => {
        
    
    setMarkers((current) => [...current, {
      name: "Click Icon/Edit to change info",
      desc: "Click Icon/Edit to change info",
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      img: park,
      time: new Date(),
   
    }]) }, []);

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback( (map) => {
    mapRef.current = map;
    console.log("here");
    
  }, [])

  const markerChange = React.useCallback( (markerList) => {
    var tempmarkersList = [
    ];
    markerList.forEach(m => {
      var Lt = m.lat;
      var Lng = m.lng;
      var locate = new window.google.maps.LatLng(parseFloat(Lt), parseFloat(Lng)); 
      if (mapRef.current.getBounds().contains(locate)) {
        tempmarkersList.push(m);
      }
    })
    console.log(tempmarkersList);
    createResultList(tempmarkersList);
  }, []);

  const panTo = React.useCallback(({lat,lng}) => {
    mapRef.current.panTo({lat,lng});
    mapRef.current.setZoom(14);
  }, []);

  if (loaderror) return "Error Loading Map";
  if (!isLoaded) return "Loading Map";

  return (
    
    <>
      
      <div className="popup" id="popup"> 
            <img className="pop-img-in" id="pop-img-pre" alt="" src= {park} />
            <div className="popup-inner">
                    <h4 id="pop-head"> Update the Spot</h4>
                    <input id="pop-title" type="text" placeholder="Enter New Title"/>
                    <input id="pop-description" type="text" placeholder="Enter New Description"/>
                    <input id="pop-img" type="file" placeholder="Upload" onChange={previewFile}/>
                    <input id="pop-img-btn" value="CHANGE IMAGE" type="button" onClick={() => document.getElementById("pop-img").click() }/>
                    <button id="delete-btn" onClick={() => {checkMarker(selected, markers) ; document.getElementById("popup").style.display = 'none'; setSelected(null)} }> DELETE </button>
                    <button className="submit-btn" onClick={() => {
                        selected.name = document.getElementById("pop-title").value;
                        selected.desc = document.getElementById("pop-description").value;
                        selected.img = document.getElementById("pop-img-pre").src;
                        document.getElementById("popup").style.display = 'none'
                        setSelected(null)
                    }}> SUBMIT</button>
                    <button id="close-btn" onClick={() => {document.getElementById("popup").style.display = 'none'; setSelected(null)} }> </button>
            </div>
      </div>
     <div className="parks-header">
     <Search panTo={panTo}/>
     <div id="whtebox">
    </div>
      <h2 id="landing-header">Find Your Next Spot!</h2>
     </div>
     <div className="MapSection" /* onLoad={fetchListHold } */> 
     <div className="MapWindow" id="MapWindow" >
     <Link to="/">
     <h1><span role="img" aria-label="skate"><img alt="" src={logo} /></span> <button id="contact-btn"> CONTACT</button> </h1>
     
     </Link>
      <Locate panTo={panTo}/>
      <GoogleMap 
          id="GoogleMapBox"
          mapContainerStyle={mapContainerStyle}
          zoom={6}
          center ={center}
          options ={options}
          onClick = {onMapClick}
          onLoad = {onMapLoad}
          onDragEnd = {() => {markerChange(markers)}}
      >

        {markers.map((marker)=> (
        <Marker 
          className = "marker-temp"
          
          position={{lat: marker.lat, lng: marker.lng,}}
          icon = {{
            url: icon,
            scaledSize: new window.google.maps.Size(30,30),
            origin: new window.google.maps.Point(0,0),
            anchor: new window.google.maps.Point(15,15),
          }}
          onClick= { () => {
            setSelected(marker);
          }}

          onLoad= { () => {
            markersList.push(marker);
            markerChange(markers);
            console.log(markers);
          }}

        

        /> 
        ))}
        {selected ? (<InfoWindow position={{ lat: selected.lat, lng: selected.lng}} onCloseClick={() => {
          setSelected(null);
          document.getElementById("popup").style.display = 'none'
        }}>
          
          
          <div >
          <h1 id="razor" > {selected.name}</h1>
          <p> Spot Added </p>
          <button > Delete</button>
          
          </div>
        </InfoWindow>) : null}
        
      </GoogleMap>  
        
     </div>
        <div className="results-container"id="results-box" >
          <h3> {getSearchInput()} </h3>
          <ul className="results-list" id="results-list-ul" style={{maxHeight: '100%', overflow: 'auto'}}>
            
          </ul>
        </div>
     </div>
    </>
  );
}

/*
<>
              <ul id="main" className="results-ul" onClick={handleClick}>
              <li id="results-img" className="results-img"> 
              <img className="img-img" alt="" src= {marker.img}/>
              </li>
              <li id="results-title" key={marker.lat} > 
              <p id="spot-list-name"> {marker.name} </p>
              <p id="spot-list-description"> {marker.desc} </p>
              <button onClick={function() { setSelected(marker); document.getElementById("popup").style.display = 'inline-flex'}}> Edit</button>
              <p id="spot-list-location">Tucson Arizona</p>

              </li>
              </ul>
              </>
*/


export function createResultList(markers) {
  if (document.getElementById('results-list-ul')) {
  let currList = document.getElementById('results-list-ul');
    while (currList.firstChild) {
      currList.removeChild(currList.firstChild);
    }
  }
  if (markers.length > 0) {

  markers.forEach(m => {
    

  var ulCont = document.getElementById("results-list-ul");
  var ulNew = document.createElement("ul");
  var liImgli = document.createElement('li');
  var liName = document.createElement('li');
  var liImg = document.createElement('img');
  var pName = document.createElement('p');
  var pDesc = document.createElement('p');
  var editButton = document.createElement('button');
  var pLoc = document.createElement('p');
  ulNew.setAttribute("id", "main");
  ulNew.setAttribute("className", "results-ul");
  liImgli.setAttribute("id", "results-img");
  liImgli.setAttribute("className", "results-img");
  liName.setAttribute("id", "main");
  liImg.setAttribute("className", "img-img");
  liImg.src = m.img;
  pName.setAttribute("id", "spot-list-name");
  pDesc.setAttribute("id", "spot-list-description");
  pLoc.setAttribute("id", "spot-list-location");
  liImgli.appendChild(liImg)
  pName.appendChild(document.createTextNode(m.name));
  pDesc.appendChild(document.createTextNode(m.desc));
  pLoc.appendChild(document.createTextNode('Tucson AZ'));
  liName.appendChild(liImgli)
  liName.appendChild(pName);
  liName.appendChild(pDesc);
  liName.appendChild(pLoc);
  ulNew.appendChild(liName);
  if (ulCont) {
    ulCont.appendChild(ulNew);
  }
  })
  }
}

export function checkMarker(selected, markers) {
  for (let i = 0; i < markers.length; i++) {
    if (selected.lat === markers[i].lat && selected.lng === markers[i].lng) {
        markers.splice(i, 1);
    }
  }
  
}

export function previewFile() {
  const preview = document.getElementById("pop-img-pre");
  const file = document.querySelector("input[id='pop-img']").files[0];
  const reader = new FileReader();

  reader.addEventListener(
    "load",
    () => {
      // convert image file to base64 string
      preview.src = reader.result;
    },
    false,
  );

  if (file) {
    reader.readAsDataURL(file);
  }
}


export function addActive () {
  // Get the container element
var btnContainer = document.getElementById("results-box");

// Get all buttons with class="btn" inside the container
var btns = btnContainer.getElementsByClassName("results-ull");

// Loop through the buttons and add the active class to the current/clicked button
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");

    // If there's no active class
    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }

    // Add the active class to the current/clicked button
    this.className += " active";
  });
}
}






// Function for "useMyLocation" button
function Locate ({panTo}) {
  return ( <button className="locate" id="locate-block" onClick={() => {
    navigator.geolocation.getCurrentPosition((position) => {
        panTo({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
    }, () => null
    );
  }}> 
    <img src={compass} alt="compass - locate me"/>
  </button>
  )
}

export function getSearchInput() {
    var id = document.getElementById("search-input");
    var val = "Results";
    if (id){
      val = id.value;
    }
  return val;
}

export function changePicture() {
  var id = document.getElementById("search-input");
  var val = "Results";
  if (id){
    val = id.value;
  }
return val;
}


// User Search Function for locations NOTE: If autofill/submit is not function Google API Billing needs to be resubmitted)
export function Search({panTo}){
  const {
    ready, 
    value, 
    suggestions: {status, data}, 
    setValue, 
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  return (
  <div className="search" id = "search-box"> 
  <Combobox onSelect={async (address) => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({address});
      const {lat, lng} = await getLatLng(results[0]);
      panTo({lat,lng});
    } catch(error) {
      console.log("error!")
    }
    }}>

      <ComboboxInput 
      value={value} 
      id="search-input"
      onChange={(e) => {setValue(e.target.value);}}
      disabled= {!ready}
      placeholder="Enter an Address"
      className="combo-search"
      />
      
      <ComboboxPopover>
        <ComboboxList>
        {status === "OK" && 
          data.map(({place_id, description})=> (
        <ComboboxOption key={place_id} value={description} onClick={function(event){ AdjustScreen (0, 100, 480); getSearchInput()}}/>))}
        </ComboboxList> 
      </ComboboxPopover>
  </Combobox>
  </div>
  );
}




export function Picture() {
    
  const [file, setFile] = React.useState([]);

  function handleChange(e) {
      console.log(e.target.file);
      setFile(URL.createObjectURL(e.target.file[0]));
  }

  return (
      <div className="App">
          <h2>Add Image:</h2>
          <input type="file" onChange={handleChange} />
          <img alt=" " src={file} key={file} />
      </div>

  );
}

var screenAdjusted = false;

export function AdjustScreen (i, k, j) {
  var map = document.getElementById("GoogleMapBox");
  var search = document.getElementById("search-box");
  var resultss = document.getElementById("results-box");
  var compasss = document.getElementById("locate-block");
  var white = document.getElementById("whtebox");
  var back = document.getElementById("containerGradient");
    if (i < 51 && !screenAdjusted) {
        search.style.width = k.toString() + "vw";
        map.style.width = i.toString() + "vw";
        search.style.height = j.toString() + "px";
        back.style.opacity = i / 50;
        setTimeout(function() {AdjustScreen(i + 1, k - 1, j - 16)}, 10);
      }
    else {
      resultss.style.display = 'block';
      compasss.style.display = 'block';
      white.style.display = 'block';
      search.style.backgroundColor = 'white';
      screenAdjusted = true;
    }
  
}







