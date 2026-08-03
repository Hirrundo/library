
import { useState } from 'react'
import BooksPage from './pages/books/books'
import ProfilePage from './pages/profile/profile'
import ReadersPage from './pages/readers/readers'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/common/layout'
import BookDetail from './pages/details/booksDetials'


function App() {
  return(
   < Routes>
    <Route path='/'element={<Layout/>}>
      <Route path='' element={<BooksPage/>}/>
      <Route path='books/:id'element={<BookDetail/>}/>
      <Route path='readers' element={<ReadersPage/>}/>
      <Route path='readers/:id' element={<ProfilePage/>}/>
    </Route>
   </Routes>
    
    
    
  
  )
}

export default App
