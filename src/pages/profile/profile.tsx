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
import ModalActiveBook from "../../components/modalWindows/modalWindowActiveBooks"
import ModalCheckoutBook from "../../components/modalWindows/modalWindowBooksCheckout"


const ProfilePage=()=>{
  const{id}=useParams();
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
    
  const [readers,setReaders]=useState(mockReaders)
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
                setReaders(prevReaders =>prevReaders.map(currentReader =>{
                  if (currentReader.id !==id){
                    return currentReader;}
                    
                    return{
                      ...currentReader,activeBooks:
                      currentReader.activeBooks.filter(
                        bookId =>bookId !== selectedBookId
                      ),
                      booksHistory: currentReader.booksHistory.map(historyBook => {if (
                        historyBook.bookId === selectedBookId&& !historyBook.returnedAt){
                          const updateBook={...historyBook,returnedAt:today};
                            return updateBook;}
                            return historyBook;
                        }
                      )
                    };
                  })
                );
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
            setReaders(prevReaders=> prevReaders.map(currentReader=>{
              if (currentReader.id !==id){
                return currentReader;
              }  
              return {
                
              }
            }
            ))
          }}
           onCancel={()=>{
            setisLendingModalOpen(false)
            setSelectedBookId(null)
           }}
           />}
          <HistorySection history={reader.booksHistory}/>
        </div>
        </>
    )
}
export default ProfilePage
