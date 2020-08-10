import React,{useState} from 'react';
import Context from './PostContext'


const PostProvider=( props) => {

    const [posts,setPosts] = useState(null);

    return (
        <Context.Provider value={{posts,setPosts}}>
            {props.children}
        </Context.Provider>
    )
}
export default PostProvider;