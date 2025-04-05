import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'
import AmujaRenovation from './Amuja';
import Admin from './Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AmujaRenovation />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
