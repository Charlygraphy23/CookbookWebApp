import React,{useContext} from 'react';
import { Formik, Form, Field , ErrorMessage} from 'formik';
import firebase from 'firebase/app'
import { toast } from 'react-toastify';
import UseretailsContext from '../Context/UseretailsContext'
import {useHistory} from 'react-router-dom'


const LoginPage=()=> {
    
    const history = useHistory();
    const context = useContext(UseretailsContext)


    const validateForm = (values) => {

        let error ={};
        const emailRegex = /^\S+@\S+\.\S+$/;
         
 
        if(!values.email){
             error.name = 'Please enter email address !!'
        }
        else if(!values.password){
          error.name = 'Please enter email password !!'
        }
        else if(!emailRegex.test(values.email)){
             error.name = 'Enter a valid email !!'
        }
        
        else if(values.password.length <= 6){
         error.name = 'Password Should be atleast 6 characters'
          }
    
        return error;       
 
     }

     const onSubmit = values => {
        firebase.auth().signInWithEmailAndPassword(values.email, values.password).then( ref => {
            let user = ref.user;
            

            let starCountRef = firebase.database().ref('/users/' + user.uid);
                starCountRef.on('value', function(snapshot) {
                    const userDetails = {
                        id : user.uid,
                        name : snapshot.val()?.name,
                        email : user.email
                    }
        
                    context.setUser(userDetails) 

                });

              
            
            toast('Login Successfully' , {
                type : 'success',
                position : 'top-right'
            })
            history.push('/')
        })
        .catch(function(error) {
            
            var errorMessage = error.message;
            toast(errorMessage , {
                type : 'error',
                position : 'top-right'
            })
          });
     }


     const handleFacebook = () => {

        var provider = new firebase.auth.FacebookAuthProvider();
        provider.addScope('user_birthday');
        firebase.auth().languageCode = 'fr_FR';

        firebase.auth().signInWithPopup(provider).then(function(result) {
            
            var token = result.credential.accessToken;
            
            var user = result.user;
            const userDetails = {
                id : user.uid,
                name : user.displayName,
                email : user.email
            }

            context.setUser(userDetails)   
            
            toast('Login Successfully' , {
                type : 'success',
                position : 'top-right'
            })
            history.push('/')
              

            
          }).catch(function(error) {            
            var errorMessage = error.message;
                        
            toast(errorMessage , {
                type : 'error',
                position : 'top-right'
            })
          });
     }

  return (
    <div className="container">
        
       <Formik
                    initialValues={{
            
                        email : '',
                        password : '',
                        
                    }}
                    validate={validateForm}
                    onSubmit={onSubmit}
                    validateOnBlur= {false}
                    validateOnChange = {false}
                    enableReinitialize ={true}
                >
                        {
                            (props) => (
                                <Form>
                                    
                                            <div className="card" style={{marginTop : '20%'}}>
                                            <div className="card-header">Login</div>
                                            <div className="card-body">

                                            <ErrorMessage component='div' className="alert alert-warning" name='name'></ErrorMessage>
                                            
                                                <button className="btn btn-primary m-4" style={{width : '70%'}} onClick={handleFacebook}>Facebook</button><br/>
                                                or
                                                
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <Field type='text' className="form-control" placeholder="Enter Email"  name="email"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Password</label>
                                                    <Field type="password" className="form-control" placeholder="Enter Password" name="password"/>
                                                </div>
                                                
                                                
                                                <button  className="btn btn-primary " type='submit' >Submit</button>
                                            
                                            </div>
                                        </div>
                                </Form>
                            )
                        }                
                </Formik>
    </div>
  );
}

export default LoginPage;
