import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import SignUp from './component/SignUp/SignUp';
import ExclusiveAccess from './component/ExclusiveAccess/ExclusiveAccess';
import SignIn from './component/SignIn/SignIn';
import Header from './component/Header/Header';
import AddPost from './component/Posts/AddPost';
import Home from './component/Home/Home';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';
import { useEffect } from 'react';
import moment from 'moment';

function App() {

  useEffect(() => {
    const tokenExpiration = localStorage.getItem('expTime');

    if (tokenExpiration && moment() > moment(localStorage.getItem('signedInAt')).add(tokenExpiration, 'milliseconds')) {
      localStorage.setItem('userAuth', '');
      localStorage.setItem('expTime', '');
      localStorage.setItem('signedInAt', '');
      localStorage.setItem('firstname', '');
      localStorage.setItem('username', '');
      localStorage.setItem('isExclusiveUser', '');
      window.location.href = '/';
    }

  }, []);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path='/' element={<Home />} />

        <Route path='/signup' element={<SignUp />} />

        <Route path='/signin' element={<SignIn />} />

        <Route path='/exclusive' element={
          <ProtectedRoute>
            <ExclusiveAccess />
          </ProtectedRoute>}
        />

        <Route path='/post/add' element={
          <ProtectedRoute>
            <AddPost />
          </ProtectedRoute>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
