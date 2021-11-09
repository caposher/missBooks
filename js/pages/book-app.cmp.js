import { bookService } from '../services/book-service.js';
import bookList from '../cmps/book-list.cmp.js';
import bookFilter from '../cmps/book-filter.cmp.js';
import bookAdd from '../cmps/book-add.cmp.js';

export default {
  name: 'book-app',
  template: `
            <section v-if="books" class="main-content">
              <book-filter @filtered="setFilter"/>
              <book-add @updated="refreshBooks"/>
              <book-list :books="booksToShow" @selected="selectBook"/>
            </section>
`,

  data() {
    return {
      books: null,
      filterBy: null,
      selectedBook: null,
    };
  },

  created() {
    this.getBooks();
  },

  methods: {
    selectBook(bookId) {
      this.$router.push(`/books/${bookId}`);
    },

    closeModel() {
      this.selectedBook = null;
    },

    setFilter(filters) {
      this.filterBy = filters;
    },
    refreshBooks() {
      this.getBooks();
    },

    getBooks() {
      bookService.quary().then((books) => (this.books = books));
    },
  },

  computed: {
    booksToShow() {
      let books = this.books;
      if (this.filterBy) {
        const searchStr = this.filterBy.bookName.toLowerCase();
        books = this.books.filter((book) => {
          return book.title.toLowerCase().includes(searchStr) && book.listPrice.amount <= this.filterBy.price;
        });
      }
      return books;
    },
  },

  components: {
    bookList,
    bookFilter,
    bookAdd,
  },
};
