
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';
  import React, { useState, useEffect } from 'react';

  import ReviewList from './ReviewList.js';

function Home(){

  const [flag,setFlag]= useState(0);

  return <>
    
    <h1 className="mt-4 mb-4">InCompany Experiences</h1>

    


    <div className="divSection container pt-4 " >
        <div className="mt-4">

          <select id="dropdownLocation">
            <option value="Hyderabad">Hyderabad</option>
            <option value="Noida">Noida</option>
            <option value="Bengaluru">Bengaluru</option>
          </select>

          <select id="dropdownSpeciality">
            <option value="Orthopaedics">Orthopaedics</option>
            <option value="Cardiologist">Cardiologist</option>
            <option value="Dentist">Dentist</option>
            <option value="ENT">ENT</option>
          </select>

          <input id="textboxSearch" placeholder="Doctor Name" className="mt-1 form input" type="search" maxLength="200"></input>
          <button className="btn-primary rounded ml-4 mb-4 pt-2 pb-2 pl-2 pr-2" type="submit"  onClick={()=>{setFlag(p => p+1)}}>Search</button>
        </div>

          {/* {console.log(document.getElementById("dropdownLocation").value)} */}
    </div>
    { flag ? <ReviewList location = {document.getElementById("dropdownLocation")? document.getElementById("dropdownLocation").value :"Hyderabad"}
          speciality = {document.getElementById("dropdownSpeciality") ? document.getElementById("dropdownSpeciality").value : "Orthopaedics"}
          name = {document.getElementById("textboxSearch") ? document.getElementById("textboxSearch").value : ""}
          />:<></>    }
  </>
} 

export default Home