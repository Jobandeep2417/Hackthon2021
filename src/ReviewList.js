// import { Link } from "react-router-dom"

import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
  } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {Row,Col,Card,Button,CardGroup} from 'react-bootstrap'
import logo from './Spinner-1s-417px.gif'
import NoReview from './NoReview'

function generateAvatar(text, foregroundColor, backgroundColor) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = 200;
    canvas.height = 200;

    // Draw background
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    context.font = "bold 100px Assistant";
    context.fillStyle = foregroundColor;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);

    return canvas.toDataURL("image/png");
}



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

console.log("props",props)
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    
    const {location,speciality,name} = props

    const data = {
        "City": location , 
        "Industry": null, 
        "Id": null, 
        "EntityName": name, 
        "Speciality": speciality
        };
        

    console.log(data)
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()

    
    useEffect(() => {


        setIsLoaded(false);
        postData('http://ic3-hackathon21-practo-poc.southindia.cloudapp.azure.com/api/v1/searchdoctor',data)
        // .then(res => res.json())
        .then(
          (result) => {
            setIsLoaded(true);
            setItems(result)
            console.log("result: ",result)
            console.log(items)
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        )

        
    }, [location,speciality,name])
    
    let firstName,lastName;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div><img src={logo} alt="loading..." /></div>;
    } else {
      return (
        <div>

            <CardGroup style={{ margin:"2%"}}>

          {
            items.length ==0 ? <NoReview/>:
              items.map((item)=>{

                    [firstName,lastName] = item.entityName.split(" ");
                    firstName = firstName ? firstName.charAt(0) : "";
                    lastName = lastName ? lastName.charAt(0) : "";
                    
                  return (
                  <div style={{ margin:"2%"}}>

                        <Card style={{ width: '16rem' }}>
                        <Card.Img variant="top"  src={generateAvatar(firstName+lastName, "white", `#${Math.floor(Math.random()*10)}0${Math.floor(Math.random()*10)}957`)} />
                        <Card.Body>
                            <Card.Title>{item.entityName}</Card.Title>
                            <Card.Subtitle className="mt-4">{item.speciality}</Card.Subtitle>
                            
                            <Card.Text className="mb-2 mt-4">
                            {item.location.city}
                            </Card.Text>

                            <Link to={`/review/${item.id}/${item.location.city}`} ><Button variant="primary">Read More</Button></Link>
                            <Button id="rating" ><div style={{display:'inline'}}>
                                {Math.floor(Math.random() * 5)}/5 <i style={{display:'inline'}} className='fas fa-star'></i>
                                </div></Button>
                            
                        </Card.Body>
                        </Card>

                  </div>);
              })
          }
     
            </CardGroup>
        </div>
      );
    }
}

export default ReviewList