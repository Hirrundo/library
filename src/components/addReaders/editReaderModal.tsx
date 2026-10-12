import { useDispatch } from "react-redux";
import type { IReader } from "../../types/reader.types";
import "./addingModal.css";
import {
  type MouseEvent,
  useState,
  type ChangeEventHandler,
  useRef,
  type SubmitEventHandler,
} from "react";
import { updateReaderAsync } from "../../store/rider-slice";
import type { AppDispatch } from "../../store/store";

type EditReaderModalProps = {
  closeHendler: () => void;
  reader?: IReader | null;
};

const EditReaderModal = ({
  closeHendler,
  reader = null,
}: EditReaderModalProps) => {
  const [phone, setPhone] = useState(reader?.phone ?? "");
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const dispatch = useDispatch<AppDispatch>();

  const refFullName = useRef<HTMLInputElement>(null);
  const refEmail = useRef<HTMLInputElement>(null);

  const formatPhone = (raw: string): string => {
    if (raw.length === 0) return "";

    let result = "+7";

    if (raw.length > 1) result += " (" + raw.substring(1, 4);
    if (raw.length > 4) result += ") " + raw.substring(4, 7);
    if (raw.length > 7) result += "-" + raw.substring(7, 9);
    if (raw.length > 9) result += "-" + raw.substring(9, 11);

    return result;
  };

  const handlerSubmit: SubmitEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!reader) return;

    const fullName = refFullName.current?.value.trim() ?? "";
    const email = refEmail.current?.value.trim() ?? "";
    const phoneDigits = phone.replace(/\D/g, "");

    const newErrors = {
      fullName: !fullName
        ? "Введите ФИО"
        : fullName.length < 3
          ? "ФИО должно содержать минимум 3 символа"
          : "",
      email: !email
        ? "Введите Email"
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? "Введите корректный Email"
          : "",
      phone: !phoneDigits
        ? "Введите телефон"
        : phoneDigits.length !== 11 || !phoneDigits.startsWith("7")
          ? "Введите полный номер телефона"
          : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    const editReader: IReader = {
      ...reader,
      fullName,
      email,
      phone,
    };

    dispatch(updateReaderAsync(editReader))
    .unwrap()
    .then(()=>closeHendler())
    .catch((error)=>console.error(error));
  };

  const handelPhoneCange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const inputData = e.target.value.replace(/\D/g, "");
    const formattedPhone = formatPhone(inputData);

    setPhone(formattedPhone);

    const phoneDigits = formattedPhone.replace(/\D/g, "");

    setErrors((prev) => ({
      ...prev,
      phone:
        !phoneDigits
          ? "Введите телефон"
          : phoneDigits.length !== 11 || !phoneDigits.startsWith("7")
            ? "Введите полный номер телефона"
            : "",
    }));
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
          <h2>Редактирование читателя</h2>
          <button
            type="button"
            className="modal-close"
            onClick={closeHendler}
          >
            ×
          </button>
        </div>

        <form onSubmit={handlerSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="fullName">ФИО *</label>
            <input
              id="fullName"
              type="text"
              ref={refFullName}
              defaultValue={reader?.fullName}
              onChange={(e) =>
                setErrors((prev) => ({
                  ...prev,
                  fullName: !e.target.value.trim()
                    ? "Введите ФИО"
                    : e.target.value.trim().length < 3
                      ? "ФИО должно содержать минимум 3 символа"
                      : "",
                }))


}
            />
            {errors.fullName && (
              <span className="error-text">{errors.fullName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              ref={refEmail}
              defaultValue={reader?.email}
              onChange={(e) =>
                setErrors((prev) => ({
                  ...prev,
                  email: !e.target.value.trim()
                    ? "Введите Email"
                    : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                          e.target.value.trim()
                        )
                      ? "Введите корректный Email"
                      : "",
                }))
              }
            />
            {errors.email && (
              <span className="error-text">{errors.email}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Телефон *</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={handelPhoneCange}
            />
            {errors.phone && (
              <span className="error-text">{errors.phone}</span>
            )}
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

export default EditReaderModal;