import React from 'react';
import firbaeCofig from './firConfig/Config'
import firebase from 'firebase/app'
import 'react-toastify/dist/ReactToastify.css';
import 'firebase/database'
import 'firebase/storage'
import 'firebase/auth'

import UserDetailsProvider from './Context/UserDetailsProvider'
import CoockBookApp from './components/CoockBookApp'
import { ToastContainer } from 'react-toastify';
import PostProvider from './Context/PostProvider'


firebase.initializeApp(firbaeCofig)

function App() {
  return (
    <UserDetailsProvider>
      <PostProvider>
          
              <ToastContainer/>
              <CoockBookApp/>
         
      </PostProvider>
    </UserDetailsProvider>
  );
}

export default App;
