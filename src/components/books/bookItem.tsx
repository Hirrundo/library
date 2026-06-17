import type{ IBook } from "../../types/book.types"
const BookItem=({book}:{IBook})=>{
    return(
         <article className="book-card">
            <div className="book-cover">
              <div className="book-cover-placeholder">
                <span className="book-cover-emoji">📖</span>
              </div>
              <span className=
              {book.isAvailable
                ? 'book-status-badge badge badge-available':'book-status-badge badge badge-unailable'
              }>{book.isAvailable}</span>
            </div>
            <div className="book-content">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>
              <div className="book-meta">
                <span className="book-year">{book.year}</span>
                <span className="book-genre">{book. genre}</span>
              </div>
              <p className="book-description">
              {book.description}
              </p>
              <button className="btn btn-primary btn-block">Подробнее</button>
            </div>
          </article>

    )
}
export default BookItem