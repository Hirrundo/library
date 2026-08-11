
import './readers.css';
import ReaderList from "../../components/readers/readersList";
import { useEffect, useState } from 'react';
import type {KeyboardEvent} from 'react';
import AddReaderModal from '../../components/addReaders/addReaderModal';
import { useSelector } from 'react-redux';
import { getCountReaders } from '../../store/rider-slice';

const ReadersPage=()=>{
  const count=useSelector(getCountReaders)
  const[showModal,setShowModal]=useState(false)
  const closeHendler=()=>{
    setShowModal(false)
  }
  
 // const submitHandler=(e:SubmitEvent<HTMLFormElement>)=>{
   // e.preventDefault();
  //  if(refFullName.current){
  //  const fullName=refFullName.current.value.trim();
    
 // }
    

  //}
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
        {showModal&&<AddReaderModal 
          closeHendler={closeHendler}

        />}
        </>
  
    )
}
export default ReadersPage