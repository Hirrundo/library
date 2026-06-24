import Footer from "../../components/common/footer"
import Header from "../../components/common/header"
import ReaderProfile from "../../components/profile/readerProfile"
import './profile.css'
import HistorySection from "../../components/profile/hictory"
import { mockReaders } from "../../moks/readers"
import { useParams } from "react-router-dom"
import NotFoundPage from "../../components/common/Page404"
import ActiveBooks from "../../components/profile/ActiveBooks"

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
           <ActiveBooks/>

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
