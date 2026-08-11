import { useDispatch } from 'react-redux';
import type { IReader } from '../../types/reader.types';
import './addingModal.css';
import {type MouseEvent, useState, type ChangeEventHandler, useRef, type SubmitEventHandler } from 'react';
import { updateReader } from '../../store/rider-slice'

type EditReaderModalProps={
  closeHendler:()=>void,
   reader?:IReader
}
const EditReaderModal = ({
  closeHendler,
  reader=null
}:EditReaderModalProps) => {
    const[phone,setPhone]=useState('');
    const dispatch=useDispatch()
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
  const handlerSubmit: SubmitEventHandler<HTMLFormElement>=(e)=>{
    e.preventDefault();
    const editReader={
        ...reader,
      fullName: refFullName.current?.value ?? reader.fullName,
      email: refEmail.current?.value ?? reader.email,
      phone: phone,
    }
    dispatch(updateReader(editReader));
    closeHendler();
  }

   const handelPhoneCange:ChangeEventHandler<HTMLInputElement>=(e)=>{
    const inputData=e.target.value.replace(/\D/g,'')
    setPhone(formatPhone(inputData))
  }

  const overlayClickHendler=(e:MouseEvent<HTMLDivElement>)=>{
    if(e.target===e.currentTarget){
      closeHendler()
    }
  }
  
  

  
  
    return(
    <div className="modal-overlay" onClick={overlayClickHendler}>
      <div className="modal">
        <div className="modal-header">
          <h2>Регистрация читателя</h2>
          <button className="modal-close" onClick={closeHendler}>×</button>
        </div>
        
        <form onSubmit={handlerSubmit}>
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
            <button type="button" className="btn btn-outline" onClick={closeHendler}>
              Отмена
            </button>
            <button type="submit" className="btn btn-primary" >
              Редактировать
            </button>
          </div>
        </form>
      </div>
    </div>
    )
}

export default EditReaderModal;
