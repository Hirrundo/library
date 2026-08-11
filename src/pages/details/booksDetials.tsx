
import DetailCard from "../../components/booksDetails/detailsCard"
import BookStats from "../../components/booksDetails/stats"
import BooksDescription from "../../components/booksDetails/description"
import BookInfo from "../../components/booksDetails/info"
import "./booksDetails.css"
import { useParams } from "react-router-dom"
import NotFoundPage from "../../components/common/Page404"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { getBookId } from "../../store/book-slice"
import { useState } from "react"
import EditBooksModal from "../../components/addBooks/EditBookModal"



const BookDetail=()=>{
   const[showModal,setShowModal]=useState(false)
    const{id}=useParams();
  const detail=useSelector((state)=>getBookId(state,id));
  if(!detail){
    return(
      <NotFoundPage/>
    )
  }
  const navigate=useNavigate()
  return(
    <>
    <button  className="back-link"onClick={()=>navigate(-1)}>← Назад к каталогу</button>

        <DetailCard detail={detail}
         onEdit={()=>setShowModal(true)}/>
           
            <BookStats detail={detail}/>

         <BooksDescription detail={detail}/>

        
        <BookInfo detail={detail}/>
        {showModal && <EditBooksModal
        book={detail}
        closeHendler={()=>setShowModal(false)}
        />}

    </>
    )
}
export default BookDetail