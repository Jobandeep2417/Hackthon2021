import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useHistory } from "react-router-dom";


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




function ReviewForm(){
    
const data = {
    "City":"Noida",
    "EntityName":"Joban Singh",
    "Speciality":"Cardiologist",
    "Story":"A Doctor with a Big Heart",
    "UserId":"josingh",
    "Alias":"Jo Singh",
    "Rating":5,
    "Tags":["Hypertension"]
    }
    let history = useHistory(); 
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);


    async function handleClick (event){

    event.preventDefault()

    const response = await fetch('http://ic3-hackathon21-practo-poc.southindia.cloudapp.azure.com/api/v1/review', {
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
      }).then(
        (result) => {
          setIsLoaded(true);
          console.log("result: ",result)
          history.push("/")
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    


    // // function Post (){
    //     postData(,data)
    //     // .then(res => res.json())
        

    
    // if (error) {
    //     return <div>Error: {error.message}</div>;
    //   } else if (!isLoaded) {
    //     return <div>Loading...</div>;
    //   } else {
    //     return (
    //       <div>
    //           {history.push("/")} 
  
    //       </div>
    //     );
    //   }
}

return(
    <>
        <div className="divSection">
          <h3>Submit Review</h3>
          <table>
            <tr>
              <td><span>Location: </span></td>
            </tr>
            <tr>
              <td>                
                <select id="dropdownLocation">
                  <option value="HYD">Hyderabad</option>
                  <option value="PNQ">Pune</option>
                  <option value="BLR">Bengaluru</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><span>Speciality: </span></td>              
            </tr>
            <tr>
              <td>
                <select id="dropdownLocation">
                  <option value="Dentist">Dentist</option>
                  <option value="Orthopedic">Orthopedic</option>
                  <option value="ENT">ENT</option>
                </select>
              </td>
            </tr>
            <tr>
              <td><span>Doctor Name</span></td>
            </tr>
            <tr>
              <td><input type="text" maxLength="100"></input></td>
            </tr>
            <tr>
              <td>Hospital Name</td>
            </tr>
            <tr>
              <td><input type="text" maxLength="100"></input></td>
            </tr>
            <tr>
              <td><span>Review</span></td>
            </tr>
            <tr>
              <td><textarea id="textboxCreateReview"></textarea></td>
            </tr>
          </table>
        </div>
        
        <button type="submit" onClick={handleClick}>Post</button>
        {/* {this.props.history.push('/')} */}
    </>
)

}

export default withRouter(ReviewForm);

// export default 