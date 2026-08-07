import ReaderProfile from "../../components/profile/readerProfile"
import './profile.css'
import HistorySection from "../../components/profile/hictory"
import { mockReaders } from "../../moks/readers"
import { useParams } from "react-router-dom"
import NotFoundPage from "../../components/common/Page404"
import ActiveBooks from "../../components/profile/ActiveBooks"
import { mockBooks } from "../../moks/books"
import { useState } from "react"
import BookLending from "../../components/profile/bookLending"
import ReaderLending from "../../components/profile/lendingReader"


const ProfilePage=()=>{
  const{id}=useParams();
  const[searchValue,setSearchValue]=useState(false)
   const [searchQuery, setSearchQuery] = useState('');
  const filteredBooks=mockBooks.filter((book)=>{
    if (!searchQuery){
      return false
    } 
    return(
  book.title.toLowerCase().includes(searchQuery.toLowerCase()))});
    
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
           
           <ActiveBooks book={activeBooks} 
            /> 
            <div>
          <BookLending onSearch={(value)=>{setSearchQuery(value)
            setSearchValue(value.length >0)}} />
         {searchQuery && (
            <span className="search-result-count">
            Найдено: {filteredBooks.length}
            </span>
            )} </div>
            
           {searchValue&&<ReaderLending books={filteredBooks}/>}
          <HistorySection history={reader.booksHistory}/>
        </div>
        </>
    )
}
export default ProfilePage
