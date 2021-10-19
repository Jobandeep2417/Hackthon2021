import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    useParams,
  } from 'react-router-dom';
  import React, { useState, useEffect } from 'react';
  import logo from './Spinner-1s-417px.gif'
  import {Card,Button} from "react-bootstrap"


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

function Votes(){

    return <>
    </>

}


function Story()
{
    const {id,city} = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [connectState,setConnectState] = useState(0);
    
    const [Votes,setVotes] = useState([0,0]);
    // const [downVotes,setDownVote] = useState(0);
    // let votes = [0,0];

    let userId,alias;
    const upVote = ()=>{

        const data = {
            "City":city,
            "EntityId":id,
            "Vote":1,
            "UserId":userId,
            "Alias":alias,
        }
        console.log(data)
        // votes[0]++;

        if(document.getElementById("btnAdd").disabled!=true && document.getElementById("deleteBtn").disabled!=true)
        {

            setVotes(p=>[p[0]+1,p[1]])
        }

        document.getElementById("btnAdd").disabled = true;
        document.getElementById("deleteBtn").disabled = true;
        
        // useEffect(() => {
           
        // }, [])

        // postData('http://ic3-hackathon21-practo-poc.southindia.cloudapp.azure.com/api/v1/vote',data)
        //     // .then(res => res.json())
        //     .then(
        //       (result) => {
                
        //         console.log("result: ",result)
        //       },

        //       (error) => {
        //         // setIsLoaded(true);
        //         // setError(error);
        //         console.log(error)
        //       }
        //     )
        
    }
    const downVote = ()=>{
        if(document.getElementById("btnAdd").disabled!=true && document.getElementById("deleteBtn").disabled!=true)
        {

            setVotes(p=>[p[0],p[1]+1])
        }
        document.getElementById("deleteBtn").disabled = true;
        document.getElementById("btnAdd").disabled = true;
        
    }
    const contactUser = (userId,id,city)=>{

        const data ={
            "FromUserId":userId,
            "ReviewId":id,
            "city":city

        }
       
        postData('http://ic3-hackathon21-practo-poc.southindia.cloudapp.azure.com/api/v1/connect',data)
            // .then(res => res.json())
            .then(
              (result) => {
                
                console.log("result: ",result)
              },
              (error) => {
                
                console.log(error)
              }
            )

            setConnectState(-1);
    }



    const data = {
        "City": city, 
        "Industry": null, 
        "Id": id, 
        "EntityName": null, 
        "EntityId": null, 
        "UserId": null, 
        "Alias": null
        }

        useEffect(() => {
            postData('http://ic3-hackathon21-practo-poc.southindia.cloudapp.azure.com/api/v1/searchreviews',data)
            // .then(res => res.json())
            .then(
              (result) => {
                
                setItems(Object.values(result));
                setIsLoaded(true);
                setVotes([result[0].upvotes,result[0].downvotes])
                console.log("result: ", result[0].downvotes)
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
          return <div><img src={logo} alt="loading..." /></div>;
        } else {
            
            let item = items[0];
            
            // setVotes([item.upvotes,item.downvotes]);
            // setDownVote(item.downvotes);
            // votes = [item.upvotes,item.downvotes]
            console.log("votes: ",Votes);
          return (
            <div>
                <div className="mb-4 mt-4 ml-4 mr-4">
                        <Card style={{ width: '10rem' },{textAlign:'center'}}>
                            <Card.Body>
                                <Card.Title>{item.story}</Card.Title>
                                <Card.Subtitle className="mt-4">{`Review Tags: ${item.tags.map((tag)=>` ${tag} `)}`}</Card.Subtitle>
                                
                                <Card.Text className="mb-2 mt-4">
                                {item.location.city}
                                </Card.Text>
                                {/* <Link to={`/story/${item.id}/${item.location.city}`} ><Button variant="primary">Read More</Button></Link> */}

                                <div style={{display:'inline'}}>

                                <h3  style={{display:'inline'},{marginTop:'2%'}}>Rating</h3>
                                <p id="votes">
                                    {/* <Votes/> */}
                                    {Votes[0]}/{Votes[1]}
                                </p>
                                <Button id="btnAdd" onClick={upVote}><i className='fas fa-angle-double-up'></i></Button>
                                
                                <Button id="deleteBtn" onClick={downVote}><i className='fas fa-angle-double-down'></i></Button>
                                </div>
                                <br></br>
                                {/* {connectState === 1 ? <img src={logo} alt="loading..." />:<></>} */}

                                { connectState === 0 ? <Button className='btnAdd' id="connect" onClick={()=>contactUser(item.userId,id,city)}>Contact User</Button>:<h2 className="mt-4">User Notified</h2>}

                                {/* {connectState === -1 ? :<></>} */}
                            </Card.Body>
                            </Card>
                       
                    </div>
    
            </div>
          );}
}

export default Story