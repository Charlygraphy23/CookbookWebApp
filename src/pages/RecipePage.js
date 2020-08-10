import React,{useEffect,useState, useContext} from 'react';
import firebase from 'firebase/app'
import ModalPage from '../components/ModalComponent'
import PostContext from '../Context/PostContext'


const RecipePage=(props)=> {
    const [data , setData] = useState(null)
    const context = useContext(PostContext);

    useEffect(()=> {      
            
            var starCountRef = firebase.database().ref('/posts/');
            starCountRef.on('value',snapshot => {
            
            setData(snapshot.val())            
        });        
        },[])


        const handleClick = (posts) =>{
                const post = {
                    id : posts[0],
                    name : posts[1].name,
                    picture : posts[1].picture,
                    description : posts[1].description
                }

                context.setPosts(post);

        }



  return (
    <div className="container">
       {data!=null && <div style={{marginTop : '20%' , marginBottom : '10%'}}>
           <div >
        {Object.entries(data).map( item =>(
           <div    key={item[0]}>
                {props.match.params.recipe == 'Veg' ? (

                        <div>
                            {Object.entries(item[1]).map(i=>(
                                            <div   key={i[0]}>
                                                 {i[0] === "Veg" ? (
                                                     <div  className='row justify-content-center ' >
                                                        {Object.entries(i[1]).map(post=>(
                                                        
                                                        <div  className="col-md-4" key={post[0]}>
                                                            <div className="card"  >
                                                            <img width="20rem" className="card-img-top" src={post[1].picture} alt="Card image"></img>
                                                            <div className="card-body">
                                                            <h4 className="card-title">{post[1].name}</h4>
                                                               <hr/>
                                                               <h5>Time : {post[1].time}( hr)</h5>
                                                               <div>
                                                                   Category : {post[1].type}
                                                               </div>
                                                               <button className="btn btn-primary mt-4" data-toggle="modal" data-target="#myModal" onClick={() => handleClick(post)}>See More...</button>
                                                               </div>                                                            
                                                             </div>
                                                        </div>
                                                    
                                                    ))}    
                                                     </div>
                                                 ) : (
                                                     <div>
                                                         {i[0] !== "NonVeg" && <div><h1>No Elements</h1></div>}
                                                     </div>
                                                 )}
                                                                            
                                            </div>
                                        ))}
                        </div>

                ) : ( <div  >
                    {Object.entries(item[1]).map(i=>(
                                            <div key={i[0]}>
                                                
                                                {i[0] === "NonVeg" ? (
                                                     <div className='row justify-content-center '  >
                                                     {Object.entries(i[1]).map(post=>(
                                                     
                                                        <div  className="col-md-4"  key={post[0]}>
                                                             <div className="card">
                                                         <img  width="20rem" className="card-img-top" src={post[1].picture} alt="Card image"></img>
                                                         <div className="card-body">
                                                         <h4 className="card-title">{post[1].name}</h4>
                                                            <hr/>
                                                            <h5>Time : {post[1].time}( hr)</h5>
                                                            <div>
                                                                Category : {post[1].type}
                                                            </div>
                                                            <button className="btn btn-primary mt-4" data-toggle="modal" data-target="#myModal" onClick={() => handleClick(post)}>See More...</button>
                                                            </div>                                                            
                                                     </div>
                                                        </div>
                                                 
                                                 ))}    
                                                  </div>
                                                 ) : (
                                                     <div>
                                                         {i[0] !== "Veg" && <div><h1>No Elements</h1></div>}
                                                     </div>
                                                 )}                               
                                            </div>
                                        ))}
                         </div>)}
               
                     </div>
       ))}
       </div>
           </div>}
       
       <ModalPage/>
    </div>
  );
}

export default RecipePage;