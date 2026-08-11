import { useDispatch } from "react-redux";
import type { IBook } from "../../types/book.types";
import "../addReaders/addingModal.css"
import {type MouseEvent, useState, type ChangeEventHandler, useRef, type SubmitEventHandler } from 'react';
import { updateBook } from "../../store/book-slice";
type EditBookModalProps={
  closeHendler:()=>void
  book?:IBook
}
const EditBooksModal = ({
  closeHendler,
  book=null
}:EditBookModalProps) => {
  const[year,setYear]=useState('')
  const dispatch=useDispatch()
  const refNameBook=useRef<HTMLInputElement>(null)
  const refFullNameAuthor=useRef<HTMLInputElement>(null)
  const refGenreBook=useRef<HTMLInputElement>(null)
  const refDescription=useRef<HTMLInputElement>(null)
  const refShortDescription=useRef<HTMLInputElement>(null)
  const formatYear=(raw:string):string=>{
    //дд.мм.гг
    let result='';
    if (raw.length===0) return result;
    result += raw.substring(0,2);
    if(raw.length>=3){
      result+='.'+ raw.substring(2,4);
      
    }
    if (raw.length>=5){
      result+='.'+ raw.substring(4,8)
    }
    return result;
  }
  const handlerSubmit: SubmitEventHandler<HTMLFormElement>=(e)=>{
      e.preventDefault();
     const editBooks={
        ...book,
        title:refNameBook.current?.value ?? book.title,
        author:refFullNameAuthor.current?.value ?? book.author,
        genre:refGenreBook.current?.value ?? book.genre,
        year:year,
        shortDescription:refShortDescription.current?.value ?? book.shortDescription,
        description:refDescription.current?.value ?? book.description
     };
     dispatch( updateBook (editBooks));
     closeHendler();
    };
  const handleDateCange:ChangeEventHandler<HTMLInputElement>=(e)=>{
    const inputData=e.target.value.replace(/\D/g,'');
    setYear(formatYear(inputData))
  }

  
  const overlayClickHendler=(e:MouseEvent<HTMLDivElement>)=>{

    if(e.target===e.currentTarget){
      closeHendler()
      
    }
  }

    return(
    <div className="modal-overlay" onClick={overlayClickHendler}>
      <div className="modal">
        <div className="modal-header">
          <h2>Добавление книги</h2>
          <button className="modal-close" onClick={closeHendler}>×</button>
        </div>
        
        <form onSubmit={handlerSubmit}>
          <div className="form-group">
            <label htmlFor="fullNameAuthor">Автор книги</label>
            <input
              id="fullNameAuthor"
              type="text"
              ref={refFullNameAuthor}
               defaultValue={book?.author}
            />
            <span className="error-text">Текст ошибки</span>
          </div>
          
          <div className="form-group">
            <label htmlFor="nameBook">Название книги</label>
            <input
              id="nameBook"
              type="text"
              ref={refNameBook}
               defaultValue={book?. title}
            />
            <span className="error-text">Текст ошибки</span>
          </div>
          
          <div className="form-group">
            <label htmlFor="yearBook">Год издания</label>
            <input
              id="yearBook"
              type="text"
              value={year}
              onChange={handleDateCange}
            />
            <span className="error-text">Текст ошибки</span>
          </div>
           <div className="form-group">
            <label htmlFor="genreBook">Жанр книги</label>
            <input
              id="genreBook"
              type="text"
              ref={refGenreBook}
               defaultValue={book?.genre}
              />
             <span className="error-text">Текст ошибки</span>
              
              </div>
              <div className="form-group">
             <label htmlFor="shortDescription">Краткое описание</label>
              <input
                id="shortDescription"
                  type="text"
                   ref={refShortDescription}
                  defaultValue={book?.shortDescription}
                    />
                </div>

                <div className="form-group">
                <label htmlFor="description">Описание книги</label>
                  <input
                   id="description"
                  ref={refDescription}
                     defaultValue={book?.description}
                       />
                      </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={closeHendler}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              Редактировать
            </button>
          </div>
        </form>
      </div>
    </div>
    )
}

export default EditBooksModal;
