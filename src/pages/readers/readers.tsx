
import './readers.css';
import ReaderList from "../../components/readers/readersList";
import { mockReaders } from "../../moks/readers";
import { useEffect, useRef, useState } from 'react';
import type { ChangeEventHandler, KeyboardEvent,SubmitEvent} from 'react';
import AddReaderModal from '../../components/addReaders/addReaderModal';
import { useSelector } from 'react-redux';
import { getCountReaders } from '../../store/rider-slice';


const ReadersPage=()=>{
  const count=useSelector(getCountReaders)
  const[showModal,setShowModal]=useState(false)
  const refFullName=useRef<HTMLInputElement>(null)
  const refEmail=useRef<HTMLInputElement>(null)
   const [phone,setPhone]=useState('')
  const closeHendler=()=>{
    setShowModal(false)
  }
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
    const inputData=e.target.value.replace();
    setPhone(formatPhone(inputData));
  }
  const submitHandler=(e:SubmitEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(refFullName.current){
    const fullName=refFullName.current.value.trim();
    
  }
    

  }
  useEffect(()=>{
    const escHendler=(e:KeyboardEvent)=>{
      if(e.key==='Escape'){
        closeHendler()
      }
    }
    if(showModal){
    document.addEventListener('keydown',escHendler);
  }
    return()=>{
       document.removeEventListener('keydown',escHendler);
    }
  },[showModal])

    return(
     <>
     <div className='page-header'>
          <div>
        <h1 className="page-title">Читатели библиотеки</h1>
        <p className="page-subtitle">
          Всего читателей: <strong>{count}</strong>
        </p>
        </div>
        <button className='btn btn-primary' id='add-reader-btn'onClick={()=>setShowModal(true)}>
          + Добавить читателя
        </button>
        </div>
        <ReaderList/>
        {showModal&&
        <AddReaderModal
        hendlerClick={closeHendler}
        hendlerSubmit={submitHandler}
        refFullName={refFullName}
        refEmail={refEmail}
        phone={phone}
        handelPhoneCange={handelPhoneCange}
        />}
        </>
  
    )
}
export default ReadersPage