import type {IReader} from '../../types/reader.types'
interface ReaderCardProps{
    reader:IReader;
}

const ReaderProfile=({reader}:ReaderCardProps)=>{
    const {fullName, email,activeBooks,phone,registrationDate,booksHistory} =reader;
    return(
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
              <div className="profile-stats">
                <span>📚 Прочитано книг: <strong>{booksHistory.length}</strong></span>
                <span>📖 Активных книг: <strong>{activeBooks.length}</strong></span>
              </div>
            </div>
          </div>
    )
}
export default ReaderProfile