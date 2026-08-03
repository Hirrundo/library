import "../addReaders/addingModal.css"
type AddBookModalProps={
  hendelClick:()=>void;
}
const AddBooksModal = ({hendelClick}:AddBookModalProps) => {
  const overlayClickHendler=(e)=>{
    const clickTarget=e.target;
    if(clickTarget.className==='modal-overlay'){
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
            />
            <span className="error-text">Текст ошибки</span>
          </div>
          
          <div className="form-group">
            <label htmlFor="nameBook">Название книги</label>
            <input
              id="nameBook"
              type="text"
            />
            <span className="error-text">Текст ошибки</span>
          </div>
          
          <div className="form-group">
            <label htmlFor="yearBook">Год издания</label>
            <input
              id="yearBook"
              type="number"
            />
            <span className="error-text">Текст ошибки</span>
          </div>
           <div className="form-group">
            <label htmlFor="genreBook">Жанр книги</label>
            <input
              id="genreBook"
              type="text"
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
