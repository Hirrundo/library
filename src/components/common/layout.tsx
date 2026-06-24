import Header from "./header"
import Footer from "./footer"
import { Outlet } from 'react-router-dom';
const Layout=()=>{
    return(
        <div className="page-wrapper">
   <Header/>
    <main className="main-content">
      <div className="container">
        <Outlet /> 
      </div>
      </main>
      <Footer/>
      </div>
    )
}
export default Layout