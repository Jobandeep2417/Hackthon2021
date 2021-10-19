
import {Link} from 'react-router-dom'

function Navbar(){

    return (<>
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4" style={{margin:'0'}}>
            <Link to="/"><img style={{height:'70px'},{width:'70px'}} src="https://th.bing.com/th/id/OIP.xcSJ9BMVu-afTOkHesMlkgHaHa?w=155&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7"></img></Link>
            {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
            <div className="collapse navbar-collapse ml-4" id="navbarNav">
                <ul className="navbar-nav x">
                <li className="nav-item active mt-4 ml-4 mr-4">
                    <a className="nav-link" href="#"><Link to="/">Home</Link></a>
                </li>
                <li className="nav-item mt-4">
                    <a className="nav-link" href="#"><Link to="/reviewForm">Post</Link></a>
                </li>
                <li className="nav-item mt-4 ml-4">
                    <a className="nav-link" href="#"><Link to="/">About</Link></a>
                </li>
                <li className="nav-item mt-4 ml-4">
                    <a className="nav-link" href="#"><Link to="/">Contact Us</Link></a>
                </li>
               
                </ul>
            </div>
</nav>
    </>);
}


export default Navbar