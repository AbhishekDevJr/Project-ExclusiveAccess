import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import SignUp from './component/SignUp/SignUp';
import ExclusiveAccess from './component/ExclusiveAccess/ExclusiveAccess';
import SignIn from './component/SignIn/SignIn';
import Header from './component/Header/Header';
import AddPost from './component/Posts/AddPost';
import Home from './component/Home/Home';
import ProtectedRoute from './component/ProtectedRoute/ProtectedRoute';

function App() {

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
