import type { IBook } from "../../types/book.types";
interface BooksStatsProps{
    detail:IBook
}
const BookStats=({detail}:BooksStatsProps)=>{
    const { readsCount,likesCount} = detail;
    return(
        <>
        <div className="book-stats">
              <div className="stat">
                <span className="stat-number"></span>
                <span className="stat-label">прочтений {readsCount}</span>
              </div>

              <div className="stat">
                <span className="stat-number"></span>
                <span className="stat-label">лайков {likesCount}❤️</span>
              </div>
            </div>

            <button className="btn btn-primary">
              ❤️ Нравится
            </button>
            </>
    )

}
export default BookStats