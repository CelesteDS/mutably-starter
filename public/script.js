console.log('Sanity Check: JS is working!')

$(document).ready(() => {
  $('.get-books').on('click', allBooks)
  $('.add-book').on('click', addBook)
})


/**
 * [allBooks description]
 * @return {[type]} [description]
 */
function allBooks() {
  fetch('http://mutably.herokuapp.com/books', { method: 'get' })
    .then(response =>
      response.json()
    ).then((res) => {
      const bookNodes = []
      res.books.forEach((book) => {
        bookNodes.push($(`<li>${book.title} by ${book.author}</li>
          <button class=get-book id=${book._id}>Details</button>
          <button class=delete-book id=D${book._id}>Delete</button>`))
      })
      $('.list-group').empty()
      bookNodes.forEach((node) => {
        $('.list-group').append(node)
      })
      $('.get-book').on('click', getBook)
      $('.delete-book').on('click', deleteBook)
    })
}

/**
 * [getBook description]
 * @return {[type]} [description]
 */
function getBook() {
  fetch(`http://mutably.herokuapp.com/books/${this.id}`, { method: 'delete' })
    .then(response =>
      response.json()
    ).then((book) => {
      $('.list-group').empty()
      $('.list-group').append($(`<li><h3>Title: ${book.title}</h3></li>
        <li>Author: ${book.author}</li>
        <li>Image: <img src="${book.image}"/></li>
        <li>Release Date: ${book.releaseDate}</li>`))
    })
    .catch(console.error)
}
//
// tomorrow: make some sort of form on page
//   to enter new book information
//   then make edit & save buttons to edit/update the book info.
//   then use a ui library to make it look nice
//   then deploy on Heroku!!
//
function addBook() {
  fetch('http://mutably.herokuapp.com/books', { method: 'post',
    headers: new Headers({ 'Content-Type': 'application/json'}),
    body: JSON.stringify({ title: 'Tiny Beautiful Things', author: 'Cheryl Strayed' }) })
    .then(response => response.json())
    .then(allBooks())
  // $('.list-group').empty()
  // $('.list-group').append($(`<`))
}

/**
 * [deleteBook description]
 * @return {[type]} [description]
 */
function deleteBook() {
  const id = this.id.slice(1);
  console.log('in delete')
  fetch(`http://mutably.herokuapp.com/books/${id}`, { method: 'delete' })
    .then(() =>
      allBooks()
    )
    .catch(console.error)
}
