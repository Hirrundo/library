import ReaderProfile from "../../components/profile/readerProfile"
import './profile.css'
import HistorySection from "../../components/profile/hictory"
import { useParams } from "react-router-dom"
import NotFoundPage from "../../components/common/Page404"
import ActiveBooks from "../../components/profile/ActiveBooks"
import { useState } from "react"
import BookLending from "../../components/profile/bookLending"
import ReaderLending from "../../components/profile/lendingReader"
import ModalActiveBook from "../../components/modalWindows/modalWindowActiveBooks"
import ModalCheckoutBook from "../../components/modalWindows/modalWindowBooksCheckout"
import { useDispatch, useSelector } from "react-redux"
import { getAllReaders,updateReader } from "../../store/rider-slice"
import { getAllBooks,updateBook } from "../../store/book-slice"


const ProfilePage=()=>{
  const{id}=useParams();
  const dispatch=useDispatch()
  const [selectedBookId,setSelectedBookId]=useState<string |null>(null)
  const [isModalOpen,setIsModalOpen]=useState(false)
   const [isLendingModalOpen,setisLendingModalOpen]=useState(false)
  const[searchValue,setSearchValue]=useState(false)
   const [searchQuery, setSearchQuery] = useState('');
   const books=useSelector(getAllBooks)
  const readers=useSelector(getAllReaders)
  const filteredBooks=books.filter((book)=>{
    if (!searchQuery){
      return false
    } 
    return book.title
    .toLowerCase()
    .includes(searchQuery.toLowerCase())
  });
    
 
  const reader=readers.find((reader)=>{return(reader.id===id)});
  if(!reader){
    return(
      <NotFoundPage/>
    )
  }
  const activeBooks=books.filter((book)=>reader.activeBooks.some((activeBook)=>activeBook.bookId===book.id));
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
                const editReader={
                  ...reader,
                  activeBooks:reader.activeBooks.filter(
                    activeBooks=>activeBooks.bookId !==selectedBookId
                  ),
                  booksHistory:reader.booksHistory.map(historyBooks=>{
                    if(historyBooks.bookId===selectedBookId && !historyBooks.returnedAt)
                    {return {
                      ...historyBooks,
                      returnedAt:today
                    }}
                    return historyBooks
                  })
                }
                dispatch(updateReader(editReader));
                setIsModalOpen(false);
                setSelectedBookId(null);
              }}
              onCancel={()=>{
                setIsModalOpen(false);
                setSelectedBookId(null);
              }}
              />
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
            const book=books.find(book=>book.id===selectedBookId);
            if (!book) return;
            const editReader={
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
            dispatch(updateReader(editReader));
            setisLendingModalOpen(false);
            setSelectedBookId(null)
           }}
           onCancel={()=>{
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
