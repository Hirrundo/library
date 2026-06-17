import type { IBook } from "../../types/book.types"
import BookItem from "./bookItem"

const BookList=({books}:{IBook[]})=>{
    return(
        <div className="card-grid">
            {books.map(book=>
                {
                    return(<BookItem book={book} key={book.id}/>)
                }
            )}
        
        </div>
       
    )
}
export default BookList