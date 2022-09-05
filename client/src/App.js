import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Navbar from "./components/Navbar/Navbar";
import NewCampground from "./components/NewCampground/NewCampground";
import Campgrounds from "./components/Campgrounds/Campgrounds";
import EditCampground from "./components/EditCampground/EditCampground";
import PostDetails from "./components/PostDetails/PostDetails";
import Auth from "./components/Auth/Auth";
import Home from "./components/Home/Home";
import './index.css';


const App = () => {
  const [currentId, setCurrentId] = useState(null);
  

  return (
    <GoogleOAuthProvider clientId='157535247447-si3vkd13nu2acvkn1vgr6h0od24b2ksa.apps.googleusercontent.com'>
      <Router>
        <Navbar />
        <Routes>
          {/* <Route path='/campgrounds' exact element={() => <Navigate to='/campgrounds' />} /> */}
          <Route path='/' exact element={<Home />} />
          <Route path='/campgrounds' exact element={<Campgrounds setCurrentId={setCurrentId} />} />
          <Route path='/campgrounds/search' exact element={<Campgrounds setCurrentId={setCurrentId} />} />
          <Route path='/campgrounds/:id' exact element={<PostDetails />}/>
          <Route path='/new_campground' exact element={<NewCampground />} />
          <Route path='/edit_campground' exact element={<EditCampground currentId={currentId} />} />
          <Route path='/auth' exact element={<Auth />} />
          {/* <Route path='/auth' exact element={() => (!user ? <Auth /> : <Navigate to='/campgrounds' />)} /> */}
        </Routes>
      </Router>
    </GoogleOAuthProvider>

  );
}

export default App;
