import type {IReader} from '../../types/reader.types'
import { useState } from 'react';
import EditReaderModal from '../addReaders/editReaderModal';
interface ReaderCardProps{
    reader:IReader;
}

const ReaderProfile=({reader}:ReaderCardProps)=>{
    const {fullName, email,activeBooks,phone,registrationDate,booksHistory} =reader;
    const[showModal,setShowModal]=useState(false)
     const closeHendler=()=>{
      setShowModal(false)
    }
    return(
      <>
         <div className="profile-header">
            <div className="profile-avatar">
              <span className="profile-avatar-emoji">👤</span>
            </div>
            <div className="profile-info">
              <h1 className="profile-name">{fullName}</h1>
              <div className="profile-details">
                <span>✉️ {email}</span>
                <span>📞 {phone}</span>
                <span>📅 {registrationDate.toLocaleDateString('ru-Ru')}</span>
              </div>
               <button className='btn btn-primary' id='add-reader-btn'onClick={()=>setShowModal(true)}>
          + редактировать
        </button>
              <div className="profile-stats">
                <span>📚 Прочитано книг: <strong>{booksHistory.length}</strong></span>
                <span>📖 Активных книг: <strong>{activeBooks.length}</strong></span>
              </div>
            </div>
          </div>
          {showModal&&
        <EditReaderModal
        reader={reader}
        closeHendler={closeHendler}
        />}
          </>
    )
}
export default ReaderProfile