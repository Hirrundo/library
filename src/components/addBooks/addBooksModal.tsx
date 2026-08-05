import type { IBook } from "../../types/book.types";
import "../addReaders/addingModal.css"
import { type SubmitEvent,type MouseEvent, useState, type ChangeEventHandler, useRef } from 'react';
type AddBookModalProps={
  hendelClick:()=>void;
  hendlerSubmit:(e:SubmitEvent<HTMLFormElement>)=>void
  book?:IBook
}
const AddBooksModal = ({hendelClick,
  hendlerSubmit,
  book
}:AddBookModalProps) => {
  const[year,setYear]=useState('')
  const refNameBook=useRef<HTMLInputElement>(null)
  const refFullNameAuthor=useRef<HTMLInputElement>(null)
  const refGenreBook=useRef<HTMLInputElement>(null)
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
  const handleDateCange:ChangeEventHandler<HTMLInputElement>=(e)=>{
    const inputData=e.target.value.replace(/\D/g,'');
    setYear(formatYear(inputData))
  }

  
  const overlayClickHendler=(e:MouseEvent<HTMLDivElement>)=>{

    if(e.target===e.currentTarget){
      hendelClick()
      
    }
  }

    return(
    <div className="modal-overlay" onClick={overlayClickHendler}>
      <div className="modal">
        <div className="modal-header">
          <h2>Добавление книги</h2>
          <button className="modal-close" onClick={hendelClick}>×</button>
        </div>
        
        <form >
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
          
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={hendelClick}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              Зарегистрировать
            </button>
          </div>
        </form>
      </div>
    </div>
    )
}

export default AddBooksModal;
