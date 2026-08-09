import "./modalWindows.css"
interface ModalActiveBookProps {
  onConfirm: () => void;
  onCancel: () => void;
}

function ModalActiveBook({ onConfirm, onCancel }: ModalActiveBookProps) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Принять книгу?</h2>

        <div className="modal-buttons">
          <button onClick={onConfirm}>
            Принять
          </button>

          <button onClick={onCancel}>
            Отменить
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalActiveBook;