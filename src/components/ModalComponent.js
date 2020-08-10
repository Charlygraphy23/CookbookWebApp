import React,{useContext,useState,useEffect} from 'react'
import PostContext from '../Context/PostContext'
import UseretailsContext from '../Context/UseretailsContext'
import {useHistory} from 'react-router-dom'
import firebase from 'firebase/app'
import { toast } from 'react-toastify';


const ModalPage = () =>{

    const context = useContext(PostContext);
    const {user} = useContext(UseretailsContext)
    const history = useHistory();
    const [comments , setComment] = useState('')
    const [commentData , setCommentData] = useState(null);

    useEffect( () => {
       if(context.posts!=null){
        var starCountRef = firebase.database().ref('/comments/')
        starCountRef.on('value',snapshot => {
          
            setCommentData(snapshot.val())      
    });
       }        
    },[context.posts,])




    const handleClick =() => {
            if(!user){
                toast( 'You need to SignIn First ', {
                    type : 'warning',
                    position : 'top-right'
                })
                history.push('/login')
            }
            else{
               if(comments === ''){
                toast( 'Enter any Comment ', {
                    type : 'warning',
                    position : 'top-right'
                })
               }else{
                firebase.database().ref('/comments/' + user.id).child(context.posts.id).set({
                    name : user.name,
                    comment : comments
                }).then( ref=> {
                    setComment('')
                    toast( 'Successful ', {
                        type : 'success',
                        position : 'top-right'
                    })
                });
               }
    
            }
    }


    return (
        <div  className="modal fade" id="myModal">
        <div className="modal-dialog modal-dialog-centered modal-xl "role="document">
            <div className="modal-content" style={{borderRadius : "20px"}}>

                    <div className="d-flex justify-content-end p-2"> 
                        <button className="clos" data-dismiss="modal">
                            <i className="fa fa-times fa-3x" aria-hidden="true"></i>

                        </button>
                    </div>

                <div className="modal-body">              

                   <div className="container text-center">
                        <div className="row justify-content-center">
                                <div>
                                    {context.posts &&  <h1 className="text-uppercase">{context.posts.name}</h1>}
                                    {context.posts && <img style={{width : "100px",margin : "5px"}} src={context.posts.picture} alt="avatar"/> }
                                </div>
                            </div>

                            <div className="row justify-content-center mt-3">
                                <div className="container " style={{width : "70%"}}>
                                    {context.posts && <p className="text-center" >{context.posts.description}.</p>}
                                </div>
                            </div>
                        </div>
                   </div>

                <div className="text-center " style={{paddingBottom: "10px" ,marginTop : "20px", marginLeft: "10px", marginRight: "10px"}}>
                   
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="comment" value={comments} onChange={(e)=> setComment(e.target.value)}/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="submit" data-dismiss={user ? (null) : ("modal")} onClick={handleClick}>Send</button>
                    </div>
                    </div>
                </div>
                Comments 
                    <hr/>
                <div className="list-group tt">
                    {commentData!= null ? (
                        <div>
                            {Object.entries(commentData).map(data => (
                                    <div key={data[0]}>
                                        {Object.entries(data[1]).map( item => (
                                            <div  key={item[0]}>
                                                {item[0] === context.posts.id ? (
                                                    <div className="list-group-item">
                                                        <div className="d-flex justify-content-start">
                                                        <p><strong>{item[1].name}</strong> - {item[1].comment}</p>
                                                        </div>
                                                    </div>
                                                 ) : (
                                                     null
                                                 )}
                                                    
                                            </div>
                                        ))}
                                    </div>
                            ))}
                        </div>
                    ) : (<div>
                        <p>No Comments</p>
                    </div>)}
                </div>
            </div>
        </div>
    </div>
    )
    
}
export default ModalPage;