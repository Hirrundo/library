import Footer from "../../components/common/footer"
import Header from "../../components/common/header"
import ReaderProfile from "../../components/profile/readerProfile"
import './profile.css'
import HistorySection from "../../components/profile/hictory"
import { mockReaders } from "../../moks/readers"
import { useParams } from "react-router-dom"
import NotFoundPage from "../../components/common/Page404"

const ProfilePage=()=>{
  const{id}=useParams();
  const reader=mockReaders.find((reader)=>{return(reader.id===id)});
  if(!reader){
    return(
      <NotFoundPage/>
    )
  }
    return(
         <div className="page-wrapper">
   <Header/>
{/* <!-- ========== MAIN ========== --> */}
    <main className="main-content">
      <div className="container">
        <div className="profile-wrapper">
        {/* <!-- Profile Header --> */}
          <ReaderProfile reader={reader}/>

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
          <HistorySection history={reader.booksHistory}/>
        </div>
      </div>
    </main>

    {/* <!-- ========== FOOTER ========== --> */}
    <Footer/>
    </div>
    )
}
export default ProfilePage
