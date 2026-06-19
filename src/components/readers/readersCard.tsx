import type {IReader} from '../../types/reader.types'
interface ReaderCardProps{
    reader:IReader;
}

const ReaderCard=({reader}:ReaderCardProps)=>{
    const {fullName, email,activeBooks} =reader;
    
    return(
          <div className="reader-card">
            <div className="reader-avatar">
              <span className="reader-avatar-emoji">👤</span>
            </div>
            <div className="reader-content">
              <h3 className="reader-name">{fullName}</h3>
              <p className="reader-email">{email}</p>
              <div className="reader-stats">
                <span className="reader-active-books">
                  📚 Активных книг: <strong>{activeBooks}</strong>
                </span>
              </div>
              <a href="reader-profile.html?id=r1" className="btn btn-primary">
                Профиль
              </a>
            </div>
          </div>
    )
}
export default ReaderCard