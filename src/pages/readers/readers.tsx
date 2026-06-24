
import './readers.css'
import ReaderList from "../../components/readers/readersList"
import { mockReaders } from "../../moks/readers"

const ReadersPage=()=>{
    return(
     <>
        <h1 className="page-title">Читатели библиотеки</h1>
        <p className="page-subtitle">
          Всего читателей: <strong>{mockReaders.length}</strong>
        </p>
        <ReaderList readers={mockReaders}/>
        </>
  
    )
}
export default ReadersPage