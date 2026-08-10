import type { IBook } from "../../types/book.types";
interface BookActiveProps{
    book:IBook[];
    onBookClick:(bookId:string)=>void;
    
    
}
const ActiveBooks=({book,onBookClick}:BookActiveProps)=>{
  
    return(
        <section className="profile-section">
            <h2 className="profile-section-title">📖 Активные книги</h2>
            <div className="active-books-list">
              {book.map((item)=>(
              <span className="active-book-item" key={item.id}
              onClick={()=>onBookClick(item.id)}>
               {item.title}
                <span className="active-book-author">
                  {item.author}
                </span>
              </span>
              ))}
            </div>
          </section>
    )
}
export default ActiveBooks