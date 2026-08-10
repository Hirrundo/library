import { useSelector } from "react-redux";
import type { IBook } from "../../types/book.types"
import BookCard from "./bookCard"
import { getAllBooks } from "../../store/book-slice";



const BookList=()=>{
    const books:IBook[]=useSelector(getAllBooks)
    if (books.length === 0) {
    return (
        <div className="empty-state">
        <div className="empty-state-icon">🔍</div>
            <h3>Книги не найдены</h3>
            <p>Попробуйте изменить параметры поиска</p>
        </div>
        );
        }

    return(
        <div className="card-grid">
            {books.map(book=>
                {
                    return(<BookCard book={book} key={book.id}/>)
                }
            )}
        
        </div>
       
    )
}
export default BookList