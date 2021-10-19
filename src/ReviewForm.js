import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router';
import { useHistory } from "react-router-dom";
import Review from './Review';
import logo from './Spinner-1s-417px.gif'


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
    
    const [doctorName,setdoctorName] = useState('');
    const [userId,setuserId] = useState('');
    const [alias,setAlias] = useState('');
    const [rating,setRating] = useState(0);
    const [speciality,setspeciality] = useState('');
    const [city,setCity] = useState('');
    const [review,setReview] = useState('');


    let history = useHistory(); 
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(0);



  
    const handleSubmit = async(e) => {

        const data = {
            "City":"Hyderabad",
            "EntityName":doctorName,
            "Speciality":speciality,
            "Story":review,
            "UserId":userId,
            "Alias":alias,
            "Rating":rating,
            "Tags":["swollen nose"]
            }


        e.preventDefault();
    setIsLoaded(1);

        // if (person.firstName && person.email && person.age) {
        //   setPerson({ firstName: '', email: '', age: '' });
        // }
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
          setIsLoaded(2);
          console.log("result: ",result)
          history.push("/")
        },
        (error) => {
          setIsLoaded(3);
          setError(error);
        }
      )

      
        console.log(data)
      };

   
    


    if(isLoaded==0)
    {
        return(
            <>
      <article className='form'>
        <form>
          <div className='form-control'>
            <label htmlFor='firstName'>Name : </label>
            <input
              required
              type='text'
              id='firstName'
              name='firstName'
              placeholder="Doctor Name"
              value={doctorName}
              onChange={(e)=>{setdoctorName(e.target.value)}}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='email'>User Id : </label>
            <input
              required

              type='email'
              id='email'
              name='email'
              value={userId}
              onChange={(e)=>{setuserId(e.target.value)}}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='alias'>Alias : </label>
            <input
              required

              type='text'
              id='alias'
              name='alias'
              value={alias}
              onChange={(e)=>{setAlias(e.target.value)}}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='rating'> Rating(0-5): </label>
            <input
              type='number'
              id='rating'
              name='rating'
              value={rating}
              max="5"
              min="0"
              onChange={(e)=>{setRating(e.target.value)}}
            />
          </div>
          <div className='form-control'>
            <label htmlFor='speciality'>Speciality : </label>
            <select value={speciality} onChange={(e)=>{setspeciality(e.target.value)}}>
                <option value="Orthopedic">Orthopedic</option>
                <option value="Dentist">Dentist</option>
                <option value="Cardiologist">Cardiologist</option>
                <option value="ENT">ENT</option>
            </select>
          </div>
          <div className='form-control'>
            <label htmlFor='locatoin'>Location : </label>
            <select value={city} onChange={(e)=>{setCity(e.target.value)}}>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Noida">Noida</option>
                <option value="Bengaluru">Bengaluru</option>
            </select>
          </div>
          <div className='form-control'>
            <label htmlFor='review'>Review : </label>
            <textarea
              type='textarea'
              id='review'
              name='review'
              value={review}
              onChange={(e)=>{setReview(e.target.value)}}
            />
          </div>
          <button type='submit' className='btn' onClick={handleSubmit}>
            Add Review
          </button>
        </form>
      </article>
    </>
        
      
        )

    }

    else if(isLoaded == 1)
    {
        return <div><img src={logo} alt="loading..." /></div>;
    }
    else{
        return <h1>Error...</h1>
    }

}

export default withRouter(ReviewForm);

// export default 