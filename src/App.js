import './App.css';

import Home from './Home'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import Review from './Review';
import Search from './Search';
import ReviewForm from './ReviewForm'
import Story from './Story';
import Navbar from './Navbar';
function App() {
  return (
    <>
    <Router>
    <Navbar style={{maxWidth:'100%'}} />

           <div style={{textAlign:'center'}}> 
            <Switch>
              <Route exact path='/' component={Home}></Route>
              <Route exact path='/review/:id/:city/:doctor' children={<Review/>}></Route>
              <Route exact path='/story/:id/:city' children={<Story/>}></Route>
              <Route exact path='/search' component={Search}></Route>
              <Route exact path='/reviewForm' component={ReviewForm}></Route>
            </Switch>
          </div>
    </Router>
    
    </>
  );
}

export default App;
