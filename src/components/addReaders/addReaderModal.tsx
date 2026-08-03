import type { IReader } from '../../types/reader.types';
import './addingModal.css';
import { type SubmitEvent,type MouseEvent, useState, type ChangeEventHandler, useRef } from 'react';

type AddReaderModalProps={
  hendelClick:()=>void;
   hendlerSubmit:(e:SubmitEvent<HTMLFormElement>)=>void
   reader?:IReader
}
const AddReaderModal = ({
  hendelClick,
  hendlerSubmit,
  reader
}:AddReaderModalProps) => {
    const[phone,setPhone]=useState('');
    const refFullName=useRef<HTMLInputElement>(null)
      const refEmail=useRef<HTMLInputElement>(null)
  const formatPhone = (raw: string): string => {
    // +7 (999) 999-99-99
  let result = '';
  if (raw.length === 0) return result;
  result += '+7';
  if (raw.length > 1) {
  result += ' (' + raw.substring(1, 4);
  }
  if (raw.length > 4) {
  result += ') ' + raw.substring(4, 7);
  }
  if (raw.length > 7) {
  result += '-' + raw.substring(7, 9);
  }
  if (raw.length > 9) {
  result += '-' + raw.substring(9, 11);
  }
  return result;
  };
   const handelPhoneCange:ChangeEventHandler<HTMLInputElement>=(e)=>{
    const inputData=e.target.value.replace(/\D/g,'')
    setPhone(formatPhone(inputData))
  }
  const overlayClickHendler=(e:MouseEvent<HTMLDivElement>)=>{
    if(e.target===e.currentTarget){
      hendelClick()
    }
  }
  
  // const validate = () => {
//const newErrors: Record<string, string> = {};
//if (!phone.trim()) newErrors.phone = 'Телефон обязателен';
//if (phone && !/^\+?[0-9\s\-()]{10,15}$/.test(phone)) {
//newErrors.phone = 'Некорректный телефон';
//}
//return newErrors;
//};
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
