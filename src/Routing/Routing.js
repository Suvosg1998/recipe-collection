import React from 'react'
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import Home from '../Components/Home'
import RecipeDetails from '../Components/RecipeDetails'

const Routing = () => {
  return (
    <Router>
        <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/recipe/:id' element={<RecipeDetails/>}/>
        </Routes>
    </Router>   
  )
}

export default Routing