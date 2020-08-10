import React from 'react';
import { Formik, Form, Field , ErrorMessage} from 'formik';
import firebase from 'firebase/app'
import { toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'



const SignupPage=()=> {

    const history = useHistory();

    const validateForm = (values) => {

        let error ={};
        const emailRegex = /^\S+@\S+\.\S+$/;
        const nameRejex = /^\S+\s+\S+/
         
 
        if(!values.email){
             error.name = 'Please enter email address !!'
        }
        else if(!values.name){
            error.name = 'Please enter name !!'
       }
        else if(!nameRejex.test(values.name)){
            error.name = 'Enter a valid name !!'
       }
        else if(!values.password){
          error.name = 'Please enter email password !!'
        }
        else if(!emailRegex.test(values.email)){
             error.name = 'Enter a valid email !!'
        }
        else if(!values.confirm_password){
            error.name = 'Please enter Confirm password !!'
          }
        
        else if(values.password.length <= 6){
         error.name = 'Password Should be atleast 6 characters'
          }
          else if(values.password !== values.confirm_password){
              error.name = 'Password no Same !!!'
          }
        return error;       
 
     }

     const onSubmit = values => {
        firebase.auth().createUserWithEmailAndPassword(values.email, values.confirm_password).then( ref => {
              

            var user = ref.user;


            firebase.database().ref('users/' + user.uid).set({
                name : values.name,
                email : user.email
            });

            toast('Signup Successfully' , {
                type : 'success',
                position : 'top-right'
            })
            history.push('/login')

        }).catch(function(error) {
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

            firebase.database().ref('users/' + user.uid).set({
                name : user.displayName,
                email : user.email
            });

            toast('Signup Successfully' , {
                type : 'success',
                position : 'top-right'
            })
            history.push('/login')
            
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
        <div className="card" style={{marginTop : '20%'}}>
         <div className="card-header">Signup</div>
         <div className="card-body">
         <button className="btn btn-primary m-4" style={{width : '70%'}} onClick={handleFacebook}>Facebook</button><br/>
                                                or
       <Formik
                    initialValues={{
                        name : '',
                        email : '',
                        password : '',
                        confirm_password : ''
                    }}
                    onSubmit={onSubmit}
                    validate={validateForm}
                    validateOnBlur= {false}
                    validateOnChange = {false}
                    enableReinitialize ={true}
                >
                        {
                            (props) => (
                                <Form>
                                            <ErrorMessage component='div' className="alert alert-warning" name='name'></ErrorMessage>
                                            
                                                
                                                <div className="form-group">
                                                    <label>Name</label>
                                                    <Field type='text' className="form-control" placeholder="Enter Name"  name="name"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <Field type='text' className="form-control" placeholder="Enter Email"  name="email"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Password</label>
                                                    <Field type="password" className="form-control" placeholder="Enter Password" name="password"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Confirm Password</label>
                                                    <Field type="password" className="form-control" placeholder="Confirm Password" name="confirm_password"/>
                                                </div>
                                                
                                                <button  className="btn btn-primary " type='submit' >Submit</button>
                                            
                                          
                                </Form>
                            )
                        }                
                     </Formik>
                  </div>
            </div>
    </div>
  );
}

export default SignupPage;
