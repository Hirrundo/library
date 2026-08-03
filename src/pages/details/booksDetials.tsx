
import DetailCard from "../../components/booksDetails/detailsCard"
import BookStats from "../../components/booksDetails/stats"
import { mockBooks } from "../../moks/books"
import BooksDescription from "../../components/booksDetails/description"
import BookInfo from "../../components/booksDetails/info"
import "./booksDetails.css"
import { useParams } from "react-router-dom"
import NotFoundPage from "../../components/common/Page404"
import { useNavigate } from "react-router-dom"



const BookDetail=()=>{
    const{id}=useParams();
  const detail=mockBooks.find((detail)=>{return(detail.id===id)});
  if(!detail){
    return(
      <NotFoundPage/>
    )
  }
  const navigate=useNavigate()
  return(
    <>
    <button  className="back-link"onClick={()=>navigate(-1)}>← Назад к каталогу</button>

        {/* <!-- BOOK HEADER --> */}
        <DetailCard detail={detail}/>
            {/* <!-- STATS --> */}
            <BookStats detail={detail}/>

        {/* <!-- DESCRIPTION --> */}
         <BooksDescription detail={detail}/>

        {/* <!-- EXTRA INFO --> */}
        <BookInfo detail={detail}/>

    </>
    )
}
export default BookDetail