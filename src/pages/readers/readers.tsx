import "./readers.css";
import ReaderList from "../../components/readers/readersList";
import { useEffect, useState } from "react";
import AddReaderModal from "../../components/addReaders/addReaderModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchReaders, getCountReaders } from "../../store/rider-slice";
import type { AppDispatch } from "../../store/store";

const ReadersPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const count = useSelector(getCountReaders);
  const [showModal, setShowModal] = useState(false);

  const closeHendler = () => {
    setShowModal(false);
  };

  useEffect(() => {
    dispatch(fetchReaders());
  }, [dispatch]);

  useEffect(() => {
    const escHendler = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        closeHendler();
      }
    };

    if (showModal) {
      document.addEventListener("keydown", escHendler);
    }

    return () => {
      document.removeEventListener("keydown", escHendler);
    };
  }, [showModal]);

  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Читатели библиотеки</h1>
          <p className="page-subtitle">
            Всего читателей: <strong>{count}</strong>
          </p>
        </div>

        <button
          className="btn btn-primary"
          id="add-reader-btn"
          onClick={() => setShowModal(true)}
        >
          + Добавить читателя
        </button>
      </div>

      <ReaderList />

      {showModal && <AddReaderModal closeHendler={closeHendler} />}
    </>
  );
};

export default ReadersPage;