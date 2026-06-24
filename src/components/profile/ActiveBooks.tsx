const ActiveBooks=()=>{
    return(
        <section className="profile-section">
            <h2 className="profile-section-title">📖 Активные книги</h2>
            <div className="active-books-list">
              <span className="active-book-item">
                Мастер и Маргарита
                <span className="active-book-author">(Булгаков)</span>
              </span>
              <span className="active-book-item">
                Евгений Онегин
                <span className="active-book-author">(Пушкин)</span>
              </span>
            </div>
          </section>
    )
}
export default ActiveBooks