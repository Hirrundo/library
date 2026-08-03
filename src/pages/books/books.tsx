import{useEffect, useRef, useState } from 'react'
import BookList from "../../components/books/bookList"
import './books.css'
import { mockBooks } from "../../moks/books"
import BookSearch from '../../components/books/bookSearch'
import type { KeyboardEvent,SubmitEvent } from 'react';
import AddBooksModal from '../../components/addBooks/addBooksModal'

const BooksPage=()=>{
  const [searchQuery, setSearchQuery] = useState('');
  const filteredBooks=mockBooks.filter((book)=>
  book.title.toLowerCase().includes(searchQuery.toLowerCase()));
  const[showModal,setShowModal]=useState(false)
   const refNameBook=useRef<HTMLInputElement>(null)
   // const refFullNameAuthor=useRef<HTMLInputElement>(null)
   // const refGenreBook=useRef<HTMLInputElement>(null)
   // const refYearBook=useRef<HTMLInputElement>(null)
    const closeHendler=()=>{
      setShowModal(false)
    }
    const submitHandler=(e:SubmitEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(refNameBook.current){
        const nameBook=refNameBook.current.value.trim();
        
      }
    }
    useEffect(()=>{
      const escHendler=(e:KeyboardEvent)=>{
        if(e.key==='Escape'){
          closeHendler()
        }
      }
      if(showModal){
      document.addEventListener('keydown',escHendler);
    }
      return()=>{
         document.removeEventListener('keydown',escHendler);
      }
    },[showModal])
  
    return(
        <>
        <div className='page-header'>
          <div>
        <h1 className="page-title">Каталог книг</h1>
        <p className="page-subtitle">
          Всего книг: <strong>{mockBooks.length}</strong>
        </p>
        </div>
         <button className='btn btn-primary' id='add-reader-btn' onClick={()=>setShowModal(true)}>
          + Добавить книгу
        </button>
        </div>
        {/* <!-- Toolbar --> */}
        <div className="page-toolbar">
          <BookSearch onSearch={setSearchQuery} />
         {searchQuery && (
            <span className="search-result-count">
            Найдено: {filteredBooks.length}
            </span>
            )} </div>
        <BookList books={filteredBooks}/>
        {showModal&&<AddBooksModal 
        hendelClick={closeHendler}
        hendlerSubmit={submitHandler}

        />}
    </>
    )
}

export default BooksPage