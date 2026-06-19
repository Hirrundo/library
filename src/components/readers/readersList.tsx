import ReaderCard from "./readersCard";
import type {IReader} from "../../types/reader.types";

interface ReaderCardProps{
    readers:IReader[];
}
const ReaderList=({readers}:ReaderCardProps)=>{

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