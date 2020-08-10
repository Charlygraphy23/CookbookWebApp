import React,{useContext,useState} from 'react';
import UseretailsContext from '../Context/UseretailsContext'
import {v4} from 'uuid'
import { Formik, Form, Field , ErrorMessage} from 'formik';
import firebase from 'firebase/app'
import { toast } from 'react-toastify';
import {useHistory} from 'react-router-dom'


const AddPost=()=> {

    const context = useContext(UseretailsContext);
    const [progress , setProgress] = useState(0);
    const [url , setUrl] = useState('');
    const history = useHistory();

    const onSubmit=(values) =>{

        if(!url){
       
         console.log("Donot upload any image yet");
           
        }else{
    
        firebase.database().ref('/posts/' + context.user.id ).child(`/${values.type}/` + v4()).set({
            name : values.name,
            type : values.type,
            time : values.time,
            description : values.recipe, 
            picture : url,
        }).then ( ref=> 
            
            toast('Recipie Added Successfully' , {
                type : 'success',
                position : 'top-right'
            })
           
            )
            history.push('/')
           
    }}

     const onValidate = (values) => {
         let error = {}

         if(!values.name){
             error.name = 'Enter a Recipe Name'
         }
         else if(values.type== '' || values.type== 'Choose One'){
            error.name = 'Enter a Recipe Type'
         }
         else if(!values.time){
            error.name = 'Enter time'
        }
        else if(!values.recipe){
            error.name = 'Enter Total Recipe '
        }
        else if(values.recipe.length <100){
            error.name = 'Recipe should be atleast 100 letter '
        }
         return error;
     }


    const hnadleChange= (e) => {
        if(e.target.files[0]){
          if(e.target.files[0].type === 'image/jpeg' || e.target.files[0].type === 'image/jpg' || e.target.files[0].type === 'image/JPEG'){
            let file = e.target.files[0];

        
            const uploadImage = firebase.storage().ref().child('/images/' + file.name).put(file);
            uploadImage.on('state_changed', snapshot => {
    
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setProgress(progress);
    
            }, error => {
                console.log(error);
            }, () => {
                uploadImage.snapshot.ref.getDownloadURL().then( durl => {
                    setUrl(durl);
                }).catch( error => {
                    console.log(error);
                })           
            })
          }else{
              setProgress(0);
              alert('Image should be in JPEG format')
          }
        }       
        
    }

  return (
    <div className="container " style={{marginTop : '10%'}}>
        <Formik
                    initialValues={{
                        name : '',
                        time : '',
                        type : '',
                        recipe : ''
                    }}
                    onSubmit={onSubmit}
                    validate={onValidate}
                    validateOnBlur= {false}
                    validateOnChange = {false}
                    enableReinitialize ={true}
                >
                        {
                            (props) => (
                                <Form>
                                    
                                            <div className="card">
                                            <div className="card-header">Add Recipe</div>
                                            <div className="card-body">

                                            <ErrorMessage component='div' className="alert alert-warning" name='name'></ErrorMessage>
                                            
                                                <div className="form-group">
                                                    <label>Recipe Name</label>
                                                    <Field type='text' className="form-control" placeholder="Enter Recipie Name"  name="name"/>
                                                </div>
                                                <div className="form-group">
                                                    <label>Time (Hr.) </label>
                                                    <Field type='text' className="form-control" placeholder="How long it will take to coock"  name="time"/>
                                                </div>

                                                <div className="form-group">
                                                    <label>Recipe Name</label>
                                                    <Field className="form-control" as="select" name="type">
                                                    <option value="Choose One">Choose One</option>
                                                    <option value="Veg">Veg</option>
                                                    <option value="NonVeg">NonVeg</option>
                                                </Field>
                                                </div>

                                                <div className="form-group">
                                                    <label>Recipe</label>
                                                    <Field as='textarea' className="form-control" placeholder="Enter Recipe"  name="recipe"/>
                                                </div>
                                            
                                                <div className="form-group">
                                                {progress <= 100 && progress!=0 && <div className="progress" >
                                                      <div className="progress-bar" aria-valuemax="100" style={{width : `${progress}%`}}></div>
                                                </div>}
                                                    <label>Picture</label>
                                                    <Field type="file" className="form-control"  name="picture" onChange={hnadleChange}/>
                                
                                                </div>
                                                
                                                <button  className="btn btn-primary " type='submit' disabled={!url} >Add Post</button>
                                            
                                            </div>
                                        </div>
                                </Form>
                            )
                        }                
                </Formik>
    </div>
  );
}

export default AddPost;
