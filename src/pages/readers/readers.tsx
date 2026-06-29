
import './readers.css';
import ReaderList from "../../components/readers/readersList";
import { mockReaders } from "../../moks/readers";
import { useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';
import AddReaderModal from '../../components/addReaders/addReaderModal';


const ReadersPage=()=>{
  const[showModal,setShowModal]=useState(false)
  const closeHendler=()=>{
    setShowModal(false)
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
          Всего читателей: <strong>{mockReaders.length}</strong>
        </p>
        </div>
        <button className='btn btn-primary' id='add-reader-btn'onClick={()=>setShowModal(true)}>
          + Добавить читателя
        </button>
        </div>
        <ReaderList readers={mockReaders}/>
        {showModal&&<AddReaderModal hendelClick={closeHendler}/>}
        </>
  
    )
}
export default ReadersPage