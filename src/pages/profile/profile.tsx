import Footer from "../../components/common/footer"
import Header from "../../components/common/header"
import ReaderProfile from "../../components/profile/readerProfile"
import './profile.css'
import { mockReaders } from "../../moks/readers"

const ProfilePage=()=>{
    return(
         <div className="page-wrapper">
   <Header/>
{/* <!-- ========== MAIN ========== --> */}
    <main className="main-content">
      <div className="container">
        <div className="profile-wrapper">
        {/* <!-- Profile Header --> */}
          <ReaderProfile reader={mockReaders[0]}/>

          {/* <!-- Active Books Section --> */}
          <section className="profile-section">
            <h2 className="profile-section-title">📖 Активные книги</h2>
            <div className="active-books-list">
              <span className="active-book-item">
                Мастер и Маргарита
                <span className="active-book-author">(Булгаков)</span>
              </span>
              <span className="active-book-item">
                Евгений Онегин
                <span className="active-book-author">(Пушкин)</span>
              </span>
            </div>
          </section>

        {/* <!-- History Section --> */}
          <section className="profile-section">
            <h2 className="profile-section-title">📚 История чтения</h2>
            <div className="history-list">
              <div className="history-item">
                <span className="history-book">Война и мир</span>
                <span className="history-date">
                  Взята: 01.02.2024, Возвращена: 15.03.2024
                </span>
              </div>
              <div className="history-item">
                <span className="history-book">Преступление и наказание</span>
                <span className="history-date">
                  Взята: 20.03.2024, Возвращена: 10.04.2024
                </span>
              </div>
              <div className="history-item">
                <span className="history-book">1984</span>
                <span className="history-date">
                  Взята: 01.05.2024, Возвращена: 20.06.2024
                </span>
              </div>
              <div className="history-item">
                <span className="history-book">Маленький принц</span>
                <span className="history-date">
                  Взята: 10.07.2024, Возвращена: 01.08.2024
                </span>
              </div>
              <div className="history-item">
                <span className="history-book">Мастер и Маргарита</span>
                <span className="history-date">
                  Взята: 15.08.2024 (активна)
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>

    {/* <!-- ========== FOOTER ========== --> */}
    <Footer/>
    </div>
    )
}
export default ProfilePage
