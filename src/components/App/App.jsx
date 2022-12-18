import React from "react";
import Header from '../Header/Header.jsx';
import Main from '../Main/Main';
import './App.css';
import { Routes, Route } from "react-router-dom";
import Profile from '../Profile/Profile';

function App() {
  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<><Header /><Main /></>} />
        <Route path="/profile" element={<><Header /><Profile /></>} />
      </Routes>
    </div>
  );
}

export default App;