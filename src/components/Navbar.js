import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import UseretailsContext from '../Context/UseretailsContext'
import { toast } from 'react-toastify';


const Navbar=() =>  {


  const context = useContext(UseretailsContext);

  const handleClick = () => {
      context.setUser(null)
      toast('Logout Successfully' , {
        type : 'error',
        position : 'top-right'
    })
  }

  return (
         <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <div className="navbar-brand">
                    LOGO
                </div>
  
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link to='/' className="nav-link">Home</Link>
                </li>
            </ul>
            <ul className="navbar-nav collapse navbar-collapse justify-content-end" >
                { !context.user && <li className="nav-item">
                   <Link to='/login' className="nav-link">Login</Link>
                </li>}
                {!context.user && <li className="nav-item">
                   <Link to='/signup' className="nav-link">SignUp</Link>
                </li>}
                {context.user && <li className="nav-item">
                <Link to='/addpost' className="nav-link">AddPost</Link>
                </li>}
                {context.user && <li className="nav-item">
                <a className="nav-link" onClick={handleClick}>Logout</a>
                </li>}
            </ul>
        </nav>
  )}

export default Navbar;
