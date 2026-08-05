import type { IBook } from "../../types/book.types";
//import { useNavigate } from "react-router-dom";
interface ReaderLendingProps{
    books:IBook[];
}
const ReaderLending=({books}: ReaderLendingProps )=>{


//const navigate=useNavigate()
return(<>
   { books.map((book)=>{
        return(
    <article className="search-result-item" key={book.id}>
            <div className=".search-result-info">
            <div>
              <h3 className="search-result-title">{book.title}</h3>
              <p className="search-result-author">{book.author}</p>
            </div>
             </div>
          </article>)
})}
</>
);
};
export default  ReaderLending;
