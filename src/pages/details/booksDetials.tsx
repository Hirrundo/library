
import DetailCard from "../../components/booksDetails/detailsCard"
import BookStats from "../../components/booksDetails/stats"
import { mockBooks } from "../../moks/books"
import BooksDescription from "../../components/booksDetails/description"
import BookInfo from "../../components/booksDetails/info"



const BookDetail=()=>{
    
  return(
    <>
    <a href="index.html" className="back-link">← Назад к каталогу</a>

        {/* <!-- BOOK HEADER --> */}
        <DetailCard detail={mockBooks[0]}/>
            {/* <!-- STATS --> */}
            <BookStats detail={mockBooks[0]}/>

        {/* <!-- DESCRIPTION --> */}
         <BooksDescription detail={mockBooks[0]}/>

        {/* <!-- EXTRA INFO --> */}
        <BookInfo detail={mockBooks[0]}/>

    </>
    )
}
export default BookDetail