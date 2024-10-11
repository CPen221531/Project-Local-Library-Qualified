function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = books.filter(book => book.borrows[0].returned === false);
  const returnedBooks = books.filter(book => book.borrows[0].returned === true);
  return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  const borrowers = [];
  book.borrows.forEach(borrow => {
    const account = accounts.find(account => account.id === borrow.id);
    if (account) {
      borrowers.push({ ...borrow, ...account });
    }
  });
  return borrowers.slice(0, 10); // Return the first 10 borrowers
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
