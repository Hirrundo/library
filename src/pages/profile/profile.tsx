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
      <>
        <div className="profile-wrapper">
     \
          <ReaderProfile reader={reader}/>
\
           <ActiveBooks/>
\
          <HistorySection history={reader.booksHistory}/>
        </div>
        </>
    )
}
export default ProfilePage
