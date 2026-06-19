import{ useState } from 'react'
import BookList from "../../components/books/bookList"
import Footer from "../../components/common/footer"
import Header from "../../components/common/header"
import './books.css'

import { mockBooks } from "../../moks/books"
import BookSearch from '../../components/books/bookSearch'

const BooksPage=()=>{
  const [searchQuery, setSearchQuery] = useState('');
  const filteredBooks=mockBooks.filter((book)=>
  book.title.toLowerCase().includes(searchQuery.toLowerCase()));
  
    return(
        <div className="page-wrapper">
    <Header/>
    
    <main className="main-content">
      <div className="container">
        <h1 className="page-title">Каталог книг</h1>
        <p className="page-subtitle">
          Всего книг: <strong>{mockBooks.length}</strong>
        </p>

        {/* <!-- Toolbar --> */}
        <div className="page-toolbar">
          <BookSearch onSearch={setSearchQuery} />
         {searchQuery && (
            <span className="search-result-count">
            Найдено: {filteredBooks.length}
            </span>
            )} </div>
        <BookList books={filteredBooks}/>
      </div>
    </main>
  <Footer/>
  </div>
    )
}

export default BooksPage