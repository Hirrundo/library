import ReaderCard from "./readersCard";
import type {IReader} from "../../types/reader.types";
import { useDispatch, useSelector } from "react-redux";
import { getAllReaders } from "../../store/rider-slice";

interface ReaderCardProps{
    readers:IReader[];
}
const ReaderList=()=>{
     const dispatch = useDispatch();
     const readers = useSelector(selectAllReaders);
  const status = useSelector(selectReadersStatus);
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