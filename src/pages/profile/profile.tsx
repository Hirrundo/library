import ReaderProfile from "../../components/profile/readerProfile"
import './profile.css'
import HistorySection from "../../components/profile/hictory"
import { useParams } from "react-router-dom"
import NotFoundPage from "../../components/common/Page404"
import ActiveBooks from "../../components/profile/ActiveBooks"
import { mockBooks } from "../../moks/books"
import { useState } from "react"
import BookLending from "../../components/profile/bookLending"
import ReaderLending from "../../components/profile/lendingReader"
import ModalActiveBook from "../../components/modalWindows/modalWindowActiveBooks"
import ModalCheckoutBook from "../../components/modalWindows/modalWindowBooksCheckout"
import { useDispatch, useSelector } from "react-redux"
import { getAllReaders } from "../../store/rider-slice"


const ProfilePage=()=>{
  const{id}=useParams();
  const dispatch=useDispatch()
  const [selectedBookId,setSelectedBookId]=useState<string |null>(null)
  const [isModalOpen,setIsModalOpen]=useState(false)
   const [isLendingModalOpen,setisLendingModalOpen]=useState(false)
  const[searchValue,setSearchValue]=useState(false)
   const [searchQuery, setSearchQuery] = useState('');
  const filteredBooks=mockBooks.filter((book)=>{
    if (!searchQuery){
      return false
    } 
    return(
  book.title.toLowerCase().includes(searchQuery.toLowerCase()))});
    
  const readers=useSelector(getAllReaders)
  const reader=readers.find((reader)=>{return(reader.id===id)});
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
           
           <ActiveBooks 
           book={activeBooks} 
           onBookClick={(bookId)=>{
            setSelectedBookId(bookId)
            setIsModalOpen(true)
           }}
            /> 
            {isModalOpen&&(
              <ModalActiveBook
              onConfirm={()=>{
                if(!selectedBookId) return;
                const today= new Date();
                const updateReader={
                  ...reader,
                  activeBooks:reader.activeBook.filter(
                    activeBooks=>activeBooks.bookId !==selectedBookId
                  ),
                  bookHistory:reader.bookHistory.map(historyBook=>{
                    if(historyBook.bookId===selectedBookId && !historyBook.returnedAt)
                    {return {
                      ...historyBook,
                      returnedAt:today
                    }}
                    return historyBook
                  })
                }
                setIsModalOpen(false);
                setSelectedBookId(null);
              }}
              onCancel={()=>{setIsModalOpen(false)}}/>
            )}
            <div>
          <BookLending onSearch={(value)=>{setSearchQuery(value)
            setSearchValue(value.length >0)}} />
         {searchQuery && (
            <span className="search-result-count">
            Найдено: {filteredBooks.length}
            </span>
            )} </div>
            
           {searchValue&&<ReaderLending books={filteredBooks}
          onBookLend={(bookId) => {
            const alreadyActive = reader.activeBooks.some(
            activeBook => activeBook.bookId === bookId
               );

               if (alreadyActive) {
                return;
                      }

              setSelectedBookId(bookId);
              setisLendingModalOpen(true);
              }}      
           />}
           {isLendingModalOpen&& <ModalCheckoutBook
          onConfirm={()=>{
            if (!selectedBookId) return;
            const today = new Date();
            const book=mockBooks.find(book=>book.id===selectedBookId);
            if (!book) return;
            const updateReader={
              ...reader,
              activeBooks:[
                ...reader.activeBooks,{
                  bookId:book.id,
                  title:book.title,
                  author:book.author,
                  issuedDate:today

                }
              ],
              bookHistory:[
                ...reader.booksHistory,{
                  bookId:book.id,
                  takenAt:today
                }
              ]
            };
            dispatch(updateReader(updateReader));
            setisLendingModalOpen(false);
            setSelectedBookId(null)
           }}
           />}
          <HistorySection history={reader.booksHistory}/>
        </div>
        </>
    )
}
export default ProfilePage
