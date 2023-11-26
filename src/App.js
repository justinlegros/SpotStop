import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import React from "react";
import Parks from './pages/Parks';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={apiResponse:""};
  }


render() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} onLoad={console.log(this.state.apiResponse)} />
      <Route path="https://justinlegros.github.io/SpotStop/" element={<Home/>} />
      <Route path="/parks" element={<Parks />} />
    </Routes> 
  );
}

}

export default App;
