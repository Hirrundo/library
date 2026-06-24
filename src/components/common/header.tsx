import {  NavLink } from "react-router-dom"
const Header=()=>{
return(
<header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">📚</span>
            <span>Библиотека</span>
          </div>
          <nav className="nav">
            <NavLink to="/">
              📖 Книги
              <span className="nav-badge">10</span>
              </NavLink>
              
              <NavLink to='/readers'>
              👤 Читатели
              <span className="nav-badge">5</span>
            </NavLink>
          </nav>
        </div>
      </div>
    </header>

)
}
export default Header