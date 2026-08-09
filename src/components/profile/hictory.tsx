import type { IBookHistory } from "../../types/reader.types"
import { mockBooks } from "../../moks/books"
interface BookHistoryProps {
    history: IBookHistory[]
}
const HistorySection = ({ history }: BookHistoryProps) => {
console.log('история в хистори',history);

    return (
        <section className="profile-section">

            <h2 className="profile-section-title">📚 История чтения</h2>
            <div className="history-list">
                {history.map(book => {
                    const returnedAd = book.returnedAt
                        ? `Возвращена: ${ book.returnedAt.toLocaleDateString('ru-Ru') }` :'(активна)';
                        const findBook=mockBooks.find((mockBook)=>{
                            return book.bookId===mockBook.id;
                        })
                        const title=findBook?findBook.title:""
                return(
                <div key={book.bookId} className="history-item">
                    <span className="history-book">{title}</span>
                    <span className="history-date">
                    Взята: {book.takenAt.toLocaleDateString('ru-Ru')},{returnedAd}
                    </span>
                </div>
                )}
            )}
            </div>
        </section>
    )
}
export default HistorySection
