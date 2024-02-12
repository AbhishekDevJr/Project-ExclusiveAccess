import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import SignUp from './component/SignUp/SignUp'

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
      </Routes>
    </BrowserRouter>
  )
}

export default App
