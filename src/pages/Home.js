import React from "react";
import {Link } from 'react-router-dom';
import "./Home.css";
import bg from "../images/skateappback.png";
import logo from "../images/skatespotblue.png";
import usePlacesAutoComplete, {
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

import "@reach/combobox/styles.css"
// import { ConnectButton, DatePicker, Select, Input } from '@web3uikit/core';
// import {Search} from '@web3uikit/icons'
// import { useState, useEffect } from "react";
// import Rentals from './Parks';

import Search from "./Parks";

const libraries = ["places"];



export default function Home() {
  
  const mapRef = React.useRef();

  const panTo = React.useCallback(({lat,lng}) => {
    mapRef.current.panTo({lat,lng});
    mapRef.current.setZoom(14);
  }, []);

  return (
    <>
      <Search panTo={panTo}/>
      <div className="container" style={ {backgroundImage: `url(${bg})`} }>
        <div id="containerGradient"></div>
      </div>
      {/* 
      <div className="topBanner">
        <div>
          <Link to={"Home.js"}>
            <img className="logo" src={logo} alt="" logo></img>
          </Link>
        </div>
        <div className="lrContainers">
            
        </div>
        
        
            
            
                
                <Link to={"/Parks"}>
                <div className="searchButton"> 
                
                </div> 
                </Link>
                
            
        
      </div>
      */}
      
    </>
  );
};
