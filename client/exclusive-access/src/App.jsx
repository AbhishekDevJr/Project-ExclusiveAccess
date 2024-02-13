import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import SignUp from './component/SignUp/SignUp'
import ExclusiveAccess from './component/ExclusiveAccess/ExclusiveAccess';
import SignIn from './component/SignIn/SignIn';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={
          <div className='container-app'>
            This is FullStack App.
          </div>}
        />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/exclusive' element={<ExclusiveAccess />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
