
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';
  import React, { useState, useEffect } from 'react';

  import ReviewList from './ReviewList.js';

function Home(){

  const [flag,setFlag]= useState(false);

  return <>
    
    <h1>Home</h1>
    <div className="divSection">
          <select id="dropdownLocation">
            <option value="HYD">Hyderabad</option>
            <option value="PNQ">Pune</option>
            <option value="BLR">Bengaluru</option>
          </select>

          <select id="dropdownSpeciality">
            <option value="Dentist">Dentist</option>
            <option value="Orthopedic">Orthopedic</option>
            <option value="ENT">ENT</option>
          </select>

          <input id="textboxSearch" type="search" maxLength="200"></input>

          <button id="buttonSearch" type="submit"  onClick={()=>{setFlag(true)}}>Search</button>
    </div>
    { flag ? <ReviewList/>:<></>    }
  </>
} 

export default Home