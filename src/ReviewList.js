// import { Link } from "react-router-dom"

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }


function ReviewList(props)
{


    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    
    const data = {
        "City": "Hyderabad", 
        "Industry": null, 
        "Id": null, 
        "EntityName": null, 
        "Speciality": "Orthopaedics"
        };


    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        postData('http://ic3-hackathon21-practo-poc.southindia.cloudapp.azure.com/api/v1/searchdoctor',data)
        // .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result)
            console.log(result)
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {
              items.map((item)=>{
                  return (<>
                    <div id="divSearchResults">
                        <div className="divSearchResult">
                        <table>
                            <tr>
                            <td>Doctor Name</td>
                            <td>{item.entityName}</td>                  
                            </tr>
                            <tr>
                            <td>Hospital Name</td>
                            <td>Manipal Hospital</td>                  
                            </tr>
                            <tr>
                            <td>Location</td>
                            <td>{item.city}</td>                  
                            </tr>
                            <tr>
                            <td>Speciality1</td>
                            <td>{item.speciality}</td>                                    
                            </tr>
                            <tr>
                            <td colSpan="3">
                                <label>
                                review about this Doctor <br/>
                                condition <br/>
                                history <br/>
                                </label>
                            </td>
                            </tr>
                            <tr>
                            <td><span>upvotes (10)</span></td>
                            <td><span>downvotes (2)</span></td>
                            <td><Link to={`/review/${item.id}`} className="btn">Read More</Link></td>
                            </tr>
                        </table>
                        </div>
                    </div>
                  </>);
              })
          }
        </div>
      );
    }
}

export default ReviewList