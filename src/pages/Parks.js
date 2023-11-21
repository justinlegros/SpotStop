import React from "react";
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

function Poppy(input) {
    
  return
}

var temp = "Results";

export default function Parks() {

  const markersList = [];

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


  const [selected, setSelected] = React.useState(null);

  const [markers, setMarkers] = React.useState([]);

  const [buttonPopup, setButtonPopup] = React.useState(false);

  const onMapClick = React.useCallback( (event) => {
        
    
    setMarkers((current) => [...current, {
      
      name: "Click Icon/Edit to change info",
      desc: "Click Icon/Edit to change info",
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
      img: park,
   
    }]) }, []);

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback( (map) => {
    mapRef.current = map;
  }, [])

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
     <div className="MapSection"> 
     <div className="MapWindow">
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
      >
        {markers.map((marker)=> (
        <Marker 
          className = "marker-temp"
          key={ marker.time.toISOString()} 
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
        /> 
        ))}
        {selected ? (<InfoWindow position={{ lat: selected.lat, lng: selected.lng}} onCloseClick={() => {
          setSelected(null);
          document.getElementById("popup").style.display = 'none'
        }}>
          
          
          <div >
          <h1 id="razor" > {selected.name}</h1>
          <p> Spot Added {formatRelative(selected.time, new Date())}</p>
          <button > Delete</button>
          
          </div>
        </InfoWindow>) : null}
      </GoogleMap>    
     </div>
        <div className="results-container"id="results-box" >
          <h3> {getSearchInput()} </h3>
          <ul className="results-list"   style={{maxHeight: '100%', overflow: 'auto'}} >
            {markers.map(marker => (
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
            ))}
          </ul>
        </div>
     </div>
    </>
  );
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







