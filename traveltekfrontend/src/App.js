import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Flights from './Flights';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Flights />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
