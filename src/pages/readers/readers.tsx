import Footer from "../../components/common/footer"
import Header from "../../components/common/header"
import './readers.css'
import ReaderList from "../../components/readers/readersList"
import { mockReaders } from "../../moks/readers"

const ReadersPage=()=>{
    return(
        <div className="page-wrapper">
{/* <!-- ========== HEADER ========== --> */}
   <Header/>

{/* <!-- ========== MAIN ========== --> */}
    <main className="main-content">
      <div className="container">
        <h1 className="page-title">Читатели библиотеки</h1>
        <p className="page-subtitle">
          Всего читателей: <strong>{mockReaders.length}</strong>
        </p>
        <ReaderList readers={mockReaders}/>
      </div>
    </main>

{/* <!-- ========== FOOTER ========== --> */}
   <Footer/>
  </div>
    )
}
export default ReadersPage