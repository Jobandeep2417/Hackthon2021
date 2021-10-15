
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    useParams,
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


function Review(){

    const {id} = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    // let items

    console.log(id)
    const data ={
        "City": "Hyderabad", 
        "Industry": null, 
        "Id": null, 
        "EntityName": null, 
        "EntityId": id, 
        "UserId": null, 
        "Alias": null
        }


    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        postData('http://ic3-hackathon21-practo-poc.southindia.cloudapp.azure.com/api/v1/searchreviews',data)
        // .then(res => res.json())
        .then(
          (result) => {
            
            setItems(Object.values(result));
            setIsLoaded(true);
            console.log("result: ",Object.values(result))
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )

        console.log("items: ",items)
    }, [])
  
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
            {items.map(element => {
               return (
                   <>
                   <h1>{element.story}</h1>
                   <h1><Link to={`/story/${element.id}`} className="btn">Read More</Link></h1>
                </>

               );
            })}

        </div>
      );
    }
}


export default Review