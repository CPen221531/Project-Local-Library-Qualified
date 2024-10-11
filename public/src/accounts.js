function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
    accounts.sort((a, b) => a.name.last > b.name.last ? 1 : -1);
    return accounts; 
}

function getTotalNumberOfBorrows(account, books) {
  let totalCount = 0;
  books.forEach(book => {
    const borrowCount = book.borrows.filter(borrow => borrow.id === account.id).length;
    totalCount += borrowCount;
  });
  return totalCount;
}


  
function getBooksPossessedByAccount(account, books, authors) {
  return books.filter((book) => {

    const isBorrowed = book.borrows.some(borrow => borrow.id === account.id && !borrow.returned);
    return isBorrowed;
  }).map(book => {

    const authorInfo = authors.find(author => author.id === book.authorId);
    return {
      ...book,
      author: authorInfo
    };
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};


