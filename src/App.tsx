
import { useState } from 'react'
import BooksPage from './pages/books/books'
import ProfilePage from './pages/profile/profile'
import ReadersPage from './pages/readers/readers'
import { Route, Routes } from 'react-router-dom'


function App() {
  return(
   < Routes>
    <Route path='/'element={<Layot/>}>
    <Route path='' element={<BooksPage/>}/>
    <Route path='readers' element={<ReadersPage/>}/>
    <Route path='readers/:id' element={<ProfilePage/>}/>
    </Route>
   </Routes>
    
    
    
  
  )
}

export default App
