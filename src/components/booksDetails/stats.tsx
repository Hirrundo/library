import type { IBook } from "../../types/book.types";
import { useDispatch } from "react-redux";
import { updateBookAsync } from "../../store/book-slice";
import type { AppDispatch } from "../../store/store";

interface BooksStatsProps {
    detail: IBook;
}

const BookStats = ({ detail }: BooksStatsProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const { readsCount, likesCount } = detail;

    const handleLike = () => {
        dispatch(
            updateBookAsync({
                ...detail,
                likesCount: (likesCount || 0) + 1,
            })
        );
    };

    return (
        <>
            <div className="book-stats">
                <div className="stat">
                    <span className="stat-number"></span>
                    <span className="stat-label">
                        Прочтений {readsCount}
                    </span>
                </div>

                <div className="stat">
                    <span className="stat-number"></span>
                    <span className="stat-label">
                        Лайков {likesCount}❤️
                    </span>
                </div>
            </div>

            <button className="btn btn-primary" onClick={handleLike}>
                ❤️ Нравится
            </button>
        </>
    );
};

export default BookStats;