import type { IBook } from "../../types/book.types";
//import { useNavigate } from "react-router-dom";
interface ReaderLendingProps{
    books:IBook[];
    onBookLend:(bookId:string)=>void;
}
const ReaderLending=({books,onBookLend}: ReaderLendingProps )=>{


//const navigate=useNavigate()
return(
  <div className="search-result">
   { books.map((book)=>{
        return(
    <article className="search-result-item" key={book.id}>
            <div className=".search-result-info">
            <div>
              <h3 className="search-result-title">{book.title}</h3>
              <p className="search-result-author">{book.author}</p>
            </div>
            <button type='button'
              className="btn btn-primary"
              onClick={()=>onBookLend(book.id)}>
                  Выдать
            </button>
             </div>
          </article>)
})}
</div>
);
};
export default  ReaderLending;
