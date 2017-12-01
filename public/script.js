console.log('Sanity Check: JS is working!')

$(document).ready(() => {
  $('.get-books').on('click', allBooks)
  $('.delete-book').on('click', deleteBook)
})

function deleteBook() {
  const id = 4
  console.log('in delete')
  fetch(`http://mutably.herokuapp.com/books/:${String(id)}`, { method: 'delete' })
    .then(() => {
      console.log('in then after delete')
      allBooks()
    })
    .catch(console.error)
}

function allBooks() {
  fetch('http://mutably.herokuapp.com/books', { method: 'get' })
    .then(response =>
      response.json()
    ).then((res) => {
      const bookNodes = []
      res.books.forEach((book) => {
        bookNodes.push($(`<li>${book.title} by ${book.author}</li>`))
      })
      $('.list-group').empty()
      bookNodes.forEach((node) => {
        $('.list-group').append(node)
      })
    })
}
