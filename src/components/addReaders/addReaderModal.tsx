import { useDispatch } from 'react-redux';
import type { IReader } from '../../types/reader.types';
import './addingModal.css';
import {type RefObject,type MouseEvent, type SubmitEventHandler, useRef, useState, type ChangeEventHandler } from 'react';
import { addReader } from '../../store/rider-slice';
import { formatPhone } from '../../utils';
type AddReaderModalProps={
   closeHendler:()=>void
   reader?:IReader|null;


}
const AddReaderModal = ({ 
  closeHendler,
  reader=null
}:AddReaderModalProps) => {
    const refFullName=useRef<HTMLInputElement>(null)
  const refEmail=useRef<HTMLInputElement>(null)
   const [phone,setPhone]=useState('')

  const dispatch=useDispatch()
  const handlerSubmit:SubmitEventHandler<HTMLFormElement>=(e)=>{
    e.preventDefault();
    const newReader={
      fullName: refFullName.current?.value,
      email: refEmail.current?.value,
      phone: phone,
    }
    dispatch(addReader(newReader))

  }
  const handelPhoneCange:ChangeEventHandler<HTMLImageElement>=(e)=>{
    const inputData=e.target.value.replace(/\D/g,'')
    setPhone(formatPhone(inputData))
  }
  const overlayClickHendler=(e:MouseEvent<HTMLDivElement>)=>{
    const overlayClickTarget=e.target;
    if(e.target===e.currentTarget){
      closeHendler()
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
          <button className="modal-close" onClick={closeHendler}>×</button>
        </div>
        
        <form >
          <div className="form-group">
            <label htmlFor="fullName">ФИО *</label>
            <input
              id="fullName"
              type="text"
              defaultValue={reader?.fullName}
            />
            <span className="error-text">Текст ошибки</span>
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              type="email"
            />
            <span className="error-text">Текст ошибки</span>
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Телефон *</label>
            <input
              id="phone"
              type="tel"
              
              onChange={handelPhoneCange}
            />
            <span className="error-text">Текст ошибки</span>
          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn btn-outline" onClick={closeHendler}>
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
