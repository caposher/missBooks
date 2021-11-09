import { bookService } from '../services/book-service.js';
import textLong from '../cmps/long-text.cmp.js';
import reviewAdd from '../cmps/review-add.cmp.js';

export default {
  template: `
    <section v-if="book" class="book-info main-content">
        <section class="info">       
            <img :src="book.thumbnail"/>
            <h1>{{this.book.title}}</h1>
            <h2>{{book.subtitle}}</h2>
            <text-long :txt="book.description"/>
            
            <h3>Author: {{getAuthor}}</h3>
            <h3>Published At: {{book.publishedDate}} <span v-if="bookCondition">( {{bookCondition}} )</span></h3>
            <h3>Language: {{book.language}}</h3>
            <h3> {{readingLen}}</h3>
            <h3> Price: <span :class="PriceColor">{{bookPrice}}</span></h3>
            <div class="book-nav">
                <router-link :to="'/books/'+ prevBook">Previous book</router-link>
                <router-link to="/books">Back</router-link>
                <router-link :to="'/books/' + nextBook">Next book</router-link>
            </div>
            <img class="sale" v-if="onSale" src="../../img/sale.png">
            <div v-for="review in book.reviews" :key="book.id">
                <p>fullName: {{review.fullName}}</p>
                <p>rate: {{review.rate}}</p>
                <p>date: {{review.dateAt}}</p>
                <p>txt: {{review.txt}}</p>
            </div>
        </section>
        <!-- <review-add @review="updateBook"/> -->
      </section>
  `,
  data() {
    return {
      book: null,
      nextBook: null,
      prevBook: null,
    };
  },

  computed: {
    readingLen() {
      let readLen = '';
      if (this.book.pageCount > 500) readLen = 'Long reading';
      else if (this.book.pageCount > 200) readLen = 'Decent reading';
      else readLen = 'Light Reading';
      return readLen;
    },

    bookCondition() {
      let bookCondition = '';
      const now = new Date();
      let timePass = now.getFullYear() - this.book.publishedDate;
      if (timePass > 10) bookCondition = 'Veteran Book';
      if (timePass < 1) bookCondition = 'New Book';
      return bookCondition;
    },

    bookPrice() {
      const { currencyCode, amount } = this.book.listPrice;
      return Intl.NumberFormat('he', { style: 'currency', currency: currencyCode }).format(amount);
    },

    PriceColor() {
      let classColor = '';
      const { amount } = this.book.listPrice;
      if (amount > 150) classColor = 'red';
      if (amount < 20) classColor = 'green';
      return classColor;
    },

    onSale() {
      return this.book.listPrice.isOnSale;
    },

    getAuthor() {
      return this.book.authors ? this.book.authors[0] : '';
    },
  },
  watch: {
    '$route.params.bookId': {
      handler() {
        const { bookId } = this.$route.params;
        bookService.getById(bookId).then((book) => {
          this.book = book;
          bookService.getPrevBookId(book.id).then((id) => (this.prevBook = id));
          bookService.getNextBookId(book.id).then((id) => (this.nextBook = id));
        });
      },
      immediate: true,
    },
  },

  components: {
    textLong,
    reviewAdd,
  },
};
