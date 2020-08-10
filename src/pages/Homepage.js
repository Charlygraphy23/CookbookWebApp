import React,{useContext,useEffect} from 'react';
import {Link} from 'react-router-dom'


const Homepage=()=> {

  return (
    <div className="container">
        <h1>Home Page</h1>
        <div className="list-group">
          <Link to="/home/Veg" className="list-group-item list-group-item-action" >Veg</Link>
          <Link to="/home/NonVeg" className="list-group-item list-group-item-action">Non-Veg</Link>
        </div>
    </div>
  );
}

export default Homepage;
