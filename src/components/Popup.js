import React from "react";
import { useState } from "react";
import './Popup.css'
import changeImage from '../pages/Parks'



export default function Popup (props) {
    var title = document.querySelector('.results-ul-active p[id="spot-list-name"]');
    var descr = document.querySelector('.results-ul-active p[id="spot-list-description"]');
    var img = document.querySelector('.results-ul-active img');

    return (props.trigger) ? (
        <div className="popup"> 
            <div className="popup-inner">
                    <input id="pop-title" type="text" placeholder="Enter New Title"/>
                    <input id="pop-description" type="text" placeholder="Enter New Description"/>
                    <img className="pop-img-in" id="pop-img-pre"alt="" src= {img.src}/>
                    <input id="pop-img" type="file" placeholder="Upload"  onChange={previewFile}/>
                    <button className="close-btn" onClick={() => {
                        title.innerHTML = document.getElementById("pop-title").value; 
                        descr.innerHTML = document.getElementById("pop-description").value;
                        img.src = document.getElementById("pop-img-pre").src;
                        props.setTrigger(false)} 
                    }> Submit</button>
                    <button className="close-btn" onClick={() => {props.setTrigger(false)} }> Close</button>
                    {props.children}
            </div>
        </div>

    ) : "";
}

function previewFile() {
    const preview = document.querySelector("img");
    const file = document.querySelector("input[type=file]").files[0];
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