import DetailCard from "../../components/booksDetails/detailsCard";
import BookStats from "../../components/booksDetails/stats";
import BooksDescription from "../../components/booksDetails/description";
import BookInfo from "../../components/booksDetails/info";
import "./booksDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import NotFoundPage from "../../components/common/Page404";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, getBookId } from "../../store/book-slice";
import { useEffect, useState } from "react";
import type { RootState } from "../../store/store";
import type { AppDispatch } from "../../store/store";
import EditBooksModal from "../../components/addBooks/EditBookModal";

const BookDetail = () => {
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const detail = useSelector((state: RootState) =>
        id ? getBookId(state, id) : undefined
    );

    const loading = useSelector((state: RootState) => state.books.loading);
    const errors = useSelector((state: RootState) => state.books.errors);

    useEffect(() => {
        if (!detail) {
            dispatch(fetchBooks());
        }
    }, [dispatch, detail]);

    if (!detail && loading) {
        return <p>Загрузка книги...</p>;
    }

    if (!detail) {
        if (errors) {
            return <p>{errors}</p>;
        }

        return <NotFoundPage />;
    }

    return (
        <>
            <button className="back-link" onClick={() => navigate(-1)}>
                ← Назад к каталогу
            </button>

            <DetailCard
                detail={detail}
                onEdit={() => setShowModal(true)}
            />

            <BookStats detail={detail} />

            <BooksDescription detail={detail} />

            <BookInfo detail={detail} />

            {showModal && (
                <EditBooksModal
                    book={detail}
                    closeHendler={() => setShowModal(false)}
                />
            )}
        </>
    );
};

export default BookDetail;