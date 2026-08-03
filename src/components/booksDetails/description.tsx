import type { IBook } from "../../types/book.types";
interface BooksDescriptionProps{
    detail:IBook
}
const BooksDescription=({detail}:BooksDescriptionProps)=>{
    const {shortDescription} = detail;
    return(
        <section className="book-description-section">
          <h2>Описание</h2>
          <p>
            {shortDescription}
          </p>
        </section>

    )
}
export default BooksDescription