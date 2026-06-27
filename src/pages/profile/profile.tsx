import ReaderProfile from "../../components/profile/readerProfile"
import './profile.css'
import HistorySection from "../../components/profile/hictory"
import { mockReaders } from "../../moks/readers"
import { useParams } from "react-router-dom"
import NotFoundPage from "../../components/common/Page404"
import ActiveBooks from "../../components/profile/ActiveBooks"
import { mockBooks } from "../../moks/books"


const ProfilePage=()=>{
  const{id}=useParams();
  const reader=mockReaders.find((reader)=>{return(reader.id===id)});
  if(!reader){
    return(
      <NotFoundPage/>
    )
  }
  const activeBooks=mockBooks.filter((book)=>reader.activeBooks.includes(book.id));
    return(
      <>
        <div className="profile-wrapper">
     
          <ReaderProfile reader={reader}/>

           <ActiveBooks book={activeBooks} />

          <HistorySection history={reader.booksHistory}/>
        </div>
        </>
    )
}
export default ProfilePage
