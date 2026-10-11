import { useDispatch, useSelector } from "react-redux";
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
import type { AppDispatch, RootState } from "../../store/store";

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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.books.loading);
  const serverError = useSelector((state: RootState) => state.books.errors);

  const refNameBook = useRef<HTMLInputElement>(null);
  const refFullNameAuthor = useRef<HTMLInputElement>(null);
  const refGenreBook = useRef<HTMLInputElement>(null);
  const refDescription = useRef<HTMLInputElement>(null);
  const refShortDescription = useRef<HTMLInputElement>(null);

  const handlerSubmit: SubmitEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (!book) return;

    const title = refNameBook.current?.value.trim() ?? "";
    const author = refFullNameAuthor.current?.value.trim() ?? "";
    const genre = refGenreBook.current?.value.trim() ?? "";
    const description = refDescription.current?.value.trim() ?? "";
    const shortDescription =
      refShortDescription.current?.value.trim() ?? "";

    const newErrors: Record<string, string> = {};

    if (!author) {
      newErrors.author = "Введите автора книги";
    }

    if (!title) {
      newErrors.title = "Введите название книги";
    }

    if (!/^\d{4}$/.test(year)) {
      newErrors.year = "Введите год издания из четырёх цифр";
    } else if (
      Number(year) < 1 ||
      Number(year) > new Date().getFullYear()
    ) {
      newErrors.year = "Укажите корректный год издания";
    }

    if (!genre) {
      newErrors.genre = "Введите жанр книги";
    }

    if (!shortDescription) {
      newErrors.shortDescription = "Введите краткое описание";
    }

    if (!description) {
      newErrors.description = "Введите описание книги";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const editedBook: IBook = {
      ...book,
      title,
      author,
      genre,
      year: Number(year),
      shortDescription,
      description,
    };

    try {
      await dispatch(updateBookAsync(editedBook)).unwrap();
      closeHendler();
    } catch {
      // Ошибка сервера отображается в форме.
    }
  };

  const handleYearChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setYear(e.target.value.replace(/\D/g, "").slice(0, 4));
    setErrors((prev) => ({ ...prev, year: "" }));
  };

  const overlayClickHendler = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !loading) {
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
            disabled={loading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handlerSubmit} noValidate>
          {serverError && (
            <p className="error-text">{serverError}</p>
          )}

          <div className="form-group">
            <label htmlFor="fullNameAuthor">Автор книги</label>
            <input
              id="fullNameAuthor"
              type="text"
              ref={refFullNameAuthor}
              defaultValue={book?.author}
            />
            {errors.author && (
              <span className=


"error-text">{errors.author}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="nameBook">Название книги</label>
            <input
              id="nameBook"
              type="text"
              ref={refNameBook}
              defaultValue={book?.title}
            />
            {errors.title && (
              <span className="error-text">{errors.title}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="yearBook">Год издания</label>
            <input
              id="yearBook"
              type="text"
              value={year}
              onChange={handleYearChange}
            />
            {errors.year && (
              <span className="error-text">{errors.year}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="genreBook">Жанр книги</label>
            <input
              id="genreBook"
              type="text"
              ref={refGenreBook}
              defaultValue={book?.genre}
            />
            {errors.genre && (
              <span className="error-text">{errors.genre}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="shortDescription">Краткое описание</label>
            <input
              id="shortDescription"
              type="text"
              ref={refShortDescription}
              defaultValue={book?.shortDescription}
            />
            {errors.shortDescription && (
              <span className="error-text">
                {errors.shortDescription}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="description">Описание книги</label>
            <input
              id="description"
              type="text"
              ref={refDescription}
              defaultValue={book?.description}
            />
            {errors.description && (
              <span className="error-text">{errors.description}</span>
            )}
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline"
              onClick={closeHendler}
              disabled={loading}
            >
              Отмена
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading || !book}
            >
              {loading ? "Сохранение..." : "Редактировать"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBooksModal;