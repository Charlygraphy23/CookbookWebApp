import React,{useContext} from 'react';
import Context from '../Context/UseretailsContext'
import { Route, Redirect } from 'react-router-dom';

const Authentication= (props) =>{

    const {user} = useContext(Context);

    if(user){
        return <Route {...props}/>
    }

    return <Redirect to='/'/>

}

export default Authentication;