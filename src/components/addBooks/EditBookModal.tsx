import { useDispatch } from "react-redux";
import type { IBook } from "../../types/book.types";
import "../addReaders/addingModal.css";
import {
  type MouseEvent,
  useState,
  type ChangeEventHandler,
  useRef,
  type SubmitEventHandler,
} from "react";
import { updateBookAsync } from "../../store/book-slice";
import type { AppDispatch } from "../../store/store";

type EditBookModalProps = {
  closeHendler: () => void;
  book?: IBook | null;
};

const EditBooksModal = ({
  closeHendler,
  book = null,
}: EditBookModalProps) => {
  const [year, setYear] = useState(
    book ? String(book.year) : ""
  );

  const dispatch = useDispatch<AppDispatch>();

  const refNameBook = useRef<HTMLInputElement>(null);
  const refFullNameAuthor = useRef<HTMLInputElement>(null);
  const refGenreBook = useRef<HTMLInputElement>(null);
  const refDescription = useRef<HTMLInputElement>(null);
  const refShortDescription = useRef<HTMLInputElement>(null);

  const handlerSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!book) return;

    const editedBook: IBook = {
      ...book,
      title: refNameBook.current?.value ?? book.title,
      author: refFullNameAuthor.current?.value ?? book.author,
      genre: refGenreBook.current?.value ?? book.genre,
      year: Number(year),
      shortDescription:
        refShortDescription.current?.value ?? book.shortDescription,
      description:
        refDescription.current?.value ?? book.description,
    };

    dispatch(updateBookAsync(editedBook));
    closeHendler();
  };

  const handleYearChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setYear(e.target.value.replace(/\D/g, "").slice(0, 4));
  };

  const overlayClickHendler = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeHendler();
    }
  };

  return (
    <div className="modal-overlay" onClick={overlayClickHendler}>
      <div className="modal">
        <div className="modal-header">
          <h2>Редактирование книги</h2>
          <button
            type="button"
            className="modal-close"
            onClick={closeHendler}
          >
            ×
          </button>
        </div>

        <form onSubmit={handlerSubmit}>
          <div className="form-group">
            <label htmlFor="fullNameAuthor">Автор книги</label>
            <input
              id="fullNameAuthor"
              type="text"
              ref={refFullNameAuthor}
              defaultValue={book?.author}
            />
            <span className="error-text">Текст ошибки</span>
          </div>

          <div className="form-group">
            <label htmlFor="nameBook">Название книги</label>
            <input
              id="nameBook"
              type="text"
              ref={refNameBook}
              defaultValue={book?.title}
            />
            <span className="error-text">Текст ошибки</span>
          </div>

          <div className="form-group">
            <label htmlFor="yearBook">Год издания</label>
            <input
              id="yearBook"
              type="text"
              value={year}
              onChange={handleYearChange}
            />
            <span className="error-text">Текст ошибки</span>
          </div>

          <div className="form-group">
            <label htmlFor="genreBook">Жанр книги</label>
            <input
              id="genreBook"
              type="text"
              ref={refGenreBook}
              defaultValue={book?.genre}
            />
            <span className="error-text">Текст ошибки</span>
          </div>

          <div className="form-group">
            <label htmlFor="shortDescription">Краткое описание</label>
            <input
              id="shortDescription"
              type="text"
              ref={refShortDescription}
              defaultValue={book?.shortDescription}
            />
          </div>

          <div className="form-group">
            <label htmlFor="d


escription">Описание книги</label>
            <input
              id="description"
              type="text"
              ref={refDescription}
              defaultValue={book?.description}
            />
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={closeHendler}
            >
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              Редактировать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBooksModal;