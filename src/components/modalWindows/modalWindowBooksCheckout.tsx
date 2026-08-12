import "./modalWindows.css"
interface ModalCheckoutBookProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function ModalCheckoutBook ({ onConfirm, onCancel }: ModalCheckoutBookProps) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Выдать книгу?</h2>

        <div className="modal-buttons">
          <button onClick={onConfirm}>
            Выдать
          </button>

          <button onClick={onCancel}>
            Отменить
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCheckoutBook ;