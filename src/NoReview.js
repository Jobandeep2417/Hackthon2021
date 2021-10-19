
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    useParams,
  } from 'react-router-dom';
import {Row,Col,Card,Button,CardGroup} from 'react-bootstrap'

function NoReview(){


    return <div className="container" style={{display:'block'}}>
    <h1>Uhh oh!!! No Review</h1>
    
    <Link to="/reviewForm" ><Button variant="primary">Post One</Button></Link>
    </div>
}


export default NoReview