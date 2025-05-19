import React from 'react'
import Login from './components/Login/Login'
import {Routes,Route} from 'react-router-dom'
import Home from '../pages/Home'

import CreateBlog from '../pages/CreateBlog'
import AllBlogs from '../pages/AllBlogs'
import EditBlog from './components/editblog/EditBlog'
import SingleBlog from './components/SingleBlog'
import Navbar from './components/Navbar/Navbar'
const App = () => {
  return (

    <div>
      <Navbar />
      <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/' element={<Home />}/>
      <Route path='/create' element={<CreateBlog />}/>
      <Route path='/blogs' element={<AllBlogs />}/>
      <Route path='/edit/:id' element={<EditBlog />}/>
      <Route path='/single/:id' element={<SingleBlog />}/>
      
      </Routes>
    </div>
    
  )
}

export default App