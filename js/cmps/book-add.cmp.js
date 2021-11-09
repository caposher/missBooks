import { bookService } from '../services/book-service.js';

export default {
  name: 'book-add',
  template: `
    <section class="book-add">
        <input type="text" v-model="searchKey" placeholder="search for a book"/>
        <button @click="searchForBook" >🔍</button>
        <ul v-if="result" class="search-result" @keydown.esc="closeSearch">
          <li v-for="res in result" :key="res.id">
            <p>{{res.title}}</p>
            <button @click="saveBook(res.id)">➕</button>
          </li>
          <li><a class="close-modal" @click="closeSearch">Close</a></li>
        </ul>
        

    </section>
  `,
  data() {
    return {
      searchKey: '',
      result: null,
    };
  },

  methods: {
    searchForBook() {
      bookService.searchBook(this.searchKey).then((data) => (this.result = data));
    },
    saveBook(bookId) {
      const book = this.result.find((book) => book.id === bookId);
      bookService.addBook(book).then(() => {
        this.$emit('updated');
      });
    },

    closeSearch() {
      this.result = null;
      this.searchKey = '';
    },
  },
};
