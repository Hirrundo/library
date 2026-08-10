import ReaderCard from "./readersCard";
import type {IReader} from "../../types/reader.types";
import { useSelector } from "react-redux";
import { getAllReaders } from "../../store/rider-slice";

const ReaderList=()=>{
         const readers:IReader[]=useSelector(getAllReaders)

    return(
         <div className="reader-list">
           {readers.map(reader=>
             {
                    return(<ReaderCard reader={reader} key={reader.id}/>)
                }
           )}
          </div>
    )
}

export default ReaderList