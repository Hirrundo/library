import type { IBook } from "../../types/book.types";
interface BooksDetailProps{
    detail:IBook
}
const DetailCard=({detail}:BooksDetailProps)=>{
    const { title, author, year, genre, } = detail;
    return(
        <section className="book-detail-header">
          <div className="book-cover-large">
            📖
          </div>

          <div className="book-detail-info">
            <h1 className="book-title">{title}</h1>
            <p className="book-author">{author}</p>

            <div className="book-meta">
              <span className="book-year">{year}</span>
              <span className="book-genre">{genre}</span>
            </div>
            </div>
            </section>

    )
}
export default DetailCard