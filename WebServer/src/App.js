import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavBar from './Navbar/NavBar';
import EventList from "./EventList";
import BookEvent from "./BookEvent";

function App() {

  return (
    <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/book" element={<BookEvent />} />
        </Routes>
    </div>
  );
}

export default App;
