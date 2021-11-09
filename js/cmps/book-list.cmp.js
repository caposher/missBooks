import bookPreview from './book-preview.cmp.js';

export default {
  name: 'book-list',
  props: ['books'],
  template: `
        <ul class="book-list">
            <li v-for="book in books" :key="book.id" class="book-previews-container">
                <book-preview :book="book" :book-id="book.id" @click.native="selectedBook(book.id)"/>
            </li>
        </ul>
  `,

  methods: {
    selectedBook(bookId) {
      this.$emit('selected', bookId);
    },
  },

  components: {
    bookPreview,
  },
};
