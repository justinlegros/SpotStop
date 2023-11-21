import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import Parks from './pages/Parks';




const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="https://justinlegros.github.io/SpotStop/" element={<Home/>} />
      <Route path="/parks" element={<Parks />} />
    </Routes> 
  );
}

export default App;
