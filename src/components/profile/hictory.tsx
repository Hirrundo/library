import type { IBookHistory } from "../../types/reader.types"
import { useSelector } from "react-redux"
import { getAllBooks } from "../../store/book-slice"

interface BookHistoryProps {
    history: IBookHistory[]
}

const HistorySection = ({ history }: BookHistoryProps) => {
    const books = useSelector(getAllBooks);

    return (
        <section className="profile-section">
            <h2 className="profile-section-title">📚 История чтения</h2>
            <div className="history-list">
                {history.map((book, index) => {
                    const returnedAd = book.returnedAt
                        ? `Возвращена: ${new Date(book.returnedAt).toLocaleDateString('ru-RU')}`
                        : '(активна)';

                    const findBook = books.find((item) => {
                        return String(book.bookId) === String(item.id);
                    });

                    const title = findBook ? findBook.title : "Книга не найдена";

                    return (
                        <div key={`${book.bookId}-${index}`} className="history-item">
                            <span className="history-book">{title}</span>
                            <span className="history-date">
                                Взята: {new Date(book.takenAt).toLocaleDateString('ru-RU')}, {returnedAd}
                            </span>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default HistorySection