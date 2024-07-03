import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/Login'
import { Provider, useSelector } from 'react-redux'
import store from './redux/app/store'
import Home from './Components/Home'
import Header from './Components/Header'


const App = () => {
  const user = useSelector((state) => state.userState.user);

  return (
      <div className="app">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path='/home' element={
              <>
                <Header user={user}/>
                <Home />
              </>
          }
          />
        </Routes>
        </Router>
      </div>
  )
}

export default App