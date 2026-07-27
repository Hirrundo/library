import type { IReader } from '../../types/reader.types';
import './addingModal.css';
import type { SubmitEvent,RefObject,MouseEvent } from 'react';
type AddReaderModalProps={
  hendelClick:()=>void;
  hendlerSubmit:(e:SubmitEvent<HTMLFormElement>)=>void
  refFullName:RefObject<HTMLInputElement>|null
  refEmail:RefObject<HTMLInputElement>|null
  phone:string
   handelPhoneCange:()=>void
   reader?:IReader


}
const AddReaderModal = ({ refEmail 
  ,refFullName,
  phone,
  hendlerSubmit,
  handelPhoneCange,
  hendelClick,
  reader
}:AddReaderModalProps) => {
  const overlayClickHendler=(e:MouseEvent<HTMLDivElement>)=>{
    const overlayClickTarget=e.target;
    if(e.target===e.currentTarget){
      hendelClick()
    }
  }
const validate = () => {
const newErrors: Record<string, string> = {};
if (!phone.trim()) newErrors.phone = 'Телефон обязателен';
if (phone && !/^\+?[0-9\s\-()]{10,15}$/.test(phone)) {
newErrors.phone = 'Некорректный телефон';
}
return newErrors;
};
    return(
    <div className="modal-overlay" onClick={overlayClickHendler}>
      <div className="modal">
        <div className="modal-header">
          <h2>Регистрация читателя</h2>
          <button className="modal-close" onClick={hendelClick}>×</button>
        </div>
        
        <form >
          <div className="form-group">
            <label htmlFor="fullName">ФИО *</label>
            <input
              id="fullName"
              type="text"
              ref={refFullName}
              defaultValue={reader?.fullName}
            />
            <span className="error-text">Текст ошибки</span>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
              ref={refEmail}
            />
            <span className="error-text">Текст ошибки</span>
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Телефон *</label>
            <input
              id="phone"
              type="tel"
              value={phone}
              onChange={handelPhoneCange}
            />
            <span className="error-text">Текст ошибки</span>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={hendelClick}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary">
              Зарегистрировать
            </button>
          </div>
        </form>
      </div>
    </div>
    )
}

export default AddReaderModal;
