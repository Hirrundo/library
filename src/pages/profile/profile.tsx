import ReaderProfile from "../../components/profile/readerProfile";
import "./profile.css";
import HistorySection from "../../components/profile/hictory";
import { useParams } from "react-router-dom";
import NotFoundPage from "../../components/common/Page404";
import ActiveBooks from "../../components/profile/ActiveBooks";
import { useState, useEffect } from "react";
import BookLending from "../../components/profile/bookLending";
import ReaderLending from "../../components/profile/lendingReader";
import ModalActiveBook from "../../components/modalWindows/modalWindowActiveBooks";
import ModalCheckoutBook from "../../components/modalWindows/modalWindowBooksCheckout";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllReaders,
  updateReaderAsync,
  fetchReaders,
} from "../../store/rider-slice";
import { getAllBooks,fetchBooks } from "../../store/book-slice";
import type { AppDispatch, RootState } from "../../store/store";

type TActiveBook = {
  bookId: string;
  title: string;
  author: string;
  issuedDate: Date;
};

const ProfilePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLendingModalOpen, setisLendingModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const books = useSelector(getAllBooks);
  const readers = useSelector(getAllReaders);
  const loading = useSelector((state: RootState) => state.readers.loading);
  const errors = useSelector((state: RootState) => state.readers.errors);

  useEffect(() => {
    dispatch(fetchReaders());
    dispatch(fetchBooks());
  }, [dispatch]);

  const filteredBooks = books.filter((book) => {
    if (!searchQuery) {
      return false;
    }
    return book.title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const reader = readers.find((reader) => reader.id === id);

  if (loading) {
    return <p>Загрузка профиля...</p>;
  }

  if (errors && readers.length === 0) {
    return <p>{errors}</p>;
  }

  if (!reader) {
    return <NotFoundPage />;
  }

  const readerActiveBooks = reader.activeBooks as unknown as (
    | string
    | TActiveBook
  )[];

  const activeBooks = books.filter((book) =>
    readerActiveBooks.some((activeBook) =>
      typeof activeBook === "string"
        ? activeBook === book.id
        : activeBook.bookId === book.id
    )
  );

  return (
    <>
      <div className="profile-wrapper">
        <ReaderProfile reader={reader} />

        <ActiveBooks
          book={activeBooks}
          onBookClick={(bookId) => {
            setSelectedBookId(bookId);
            setIsModalOpen(true);
          }}
        />

        {isModalOpen && (
          <ModalActiveBook
            onConfirm={() => {
              if (!selectedBookId) return;
              const today = new Date();

              const editReader = {
                ...reader,
                activeBooks: readerActiveBooks.filter((activeBook) =>
                  typeof activeBook === "string"
                    ? activeBook !== selectedBookId
                    : activeBook.bookId !== selectedBookId
                ) as unknown as TActiveBook[],
                booksHistory: reader.booksHistory.map((historyBooks) => {
                  if (
                    historyBooks.bookId === selectedBookId &&
                    !historyBooks.returnedAt
                  ) {
                    return {
                      ...historyBooks,
                      returnedAt: today,
                    };
                  }
                  return historyBooks;
                }),
              };

              dispatch(updateReaderAsync(editReader));
              setIsModalOpen(false);
              setSelectedBookId(null);
            }}
            onCancel={() => {
              setIsModalOpen(false);
              setSelectedBookId(null);
            }}
          />
        )}

        <div className="search-section">
          <BookLending
            onSearch={(value) => {
              setSearchQuery(value);
              setSearchValue(value.length > 0);
            }}
          />
          {searchQuery && (
            <span className="search-result-count">
              Найдено: {filteredBooks.length}
            </span>
          )}
        </div>

        {searchValue && (
          <ReaderLending
            books={filteredBooks}
            onBookLend={(bookId) => {
              const alreadyActive = readerActiveBooks.some((activeBook) =>
                typeof activeBook === "string"
                  ? activeBook === bookId
                  : activeBook.bookId === bookId
              );

              if (alreadyActive) {
                return;
              }

              setSelectedBookId(bookId);
              setisLendingModalOpen(true);
            }}
          />
        )}

        {isLendingModalOpen && (
          <ModalCheckoutBook
            onConfirm={() => {
              if (!selectedBookId) return;

              const today = new Date();
              const book = books.find(
                (book) => book.id === selectedBookId
              );

              if (!book) return;

              const editReader = {
                ...reader,
                activeBooks: [
                  ...readerActiveBooks,
                  {
                    bookId: book.id,
                    title: book.title,
                    author: book.author,
                    issuedDate: today,
                  },
                ] as unknown as TActiveBook[],
                booksHistory: [
                  ...reader.booksHistory,
                  {
                    bookId: book.id,
                    takenAt: today,
                  },
                ],
              };

              dispatch(updateReaderAsync(editReader));
              setisLendingModalOpen(false);
              setSelectedBookId(null);
            }}
            onCancel={() => {
              setisLendingModalOpen(false);
              setSelectedBookId(null);
            }}
          />
        )}
        <div className="history-section-wrapper">
        <HistorySection history={reader.booksHistory} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;