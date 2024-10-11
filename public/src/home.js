function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.filter(book => book.borrows.some(borrow => borrow.returned === false)).length;
}

function getMostCommonGenres(books) {
  const genreCount = books.reduce((acc, { genre }) => {
    acc[genre] = (acc[genre] || 0) + 1;
    return acc;
  }, {});

  const sortedGenres = Object.entries(genreCount)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([genre, count]) => ({ name: genre, count }));

  return sortedGenres.slice(0, 5); // Returning top 5 most common genres
}

function getMostPopularBooks(books) {
  const borrowedCounts = books.map(book => ({ name: book.title, count: book.borrows.length }));
  return borrowedCounts.sort((a, b) => b.count - a.count).slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  const authorBorrows = {};
  books.forEach(book => {
    const author = authors.find(author => author.id === book.authorId);
    const authorName = `${author.name.first} ${author.name.last}`;
    if (authorBorrows[authorName]) {
      authorBorrows[authorName] += book.borrows.length;
    } else {
      authorBorrows[authorName] = book.borrows.length;
    }
  });

  return Object.entries(authorBorrows)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([author, count]) => ({ name: author, count }))
    .slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
