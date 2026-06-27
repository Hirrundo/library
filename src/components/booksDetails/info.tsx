import type { IBook } from "../../types/book.types";
interface BooksInfoProps{
    detail:IBook
}
const BookInfo=({detail}:BooksInfoProps)=>{
    const { year, author, genre,isAvailable} = detail;
    const statusclassName = isAvailable ? 'badge-available' : 'badge-unavailable';
    const statusText = isAvailable ? 'Доступна' : 'Выдана';
    return(
          <section className="book-extra">
          <h2>Дополнительно</h2>

          <ul className="book-extra-list">
            <li>📅 Год издания: {year}</li>
            <li>📚 Жанр: {genre}</li>
            <li>👤 Автор: {author}</li>
            <li className={statusclassName
                ? 'book-status-badge badge badge-available':'book-status-badge badge badge-unavailable'}>📊 Статус:{statusText} </li>
          </ul>
        </section>


    )
}
export default BookInfo