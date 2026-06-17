const BookItem=()=>{
    return(
         <article className="book-card">
            <div className="book-cover">
              <div className="book-cover-placeholder">
                <span className="book-cover-emoji">📖</span>
              </div>
              <span className="book-status-badge badge badge-unavailable">Выдана</span>
            </div>
            <div className="book-content">
              <h3 className="book-title">Мастер и Маргарита</h3>
              <p className="book-author">Михаил Булгаков</p>
              <div className="book-meta">
                <span className="book-year">1967</span>
                <span className="book-genre">Роман</span>
              </div>
              <p className="book-description">
                Мистический роман о дьяволе, посетившем Москву в 1930-х годах.
              </p>
              <button className="btn btn-primary btn-block">Подробнее</button>
            </div>
          </article>

    )
}
export default BookItem