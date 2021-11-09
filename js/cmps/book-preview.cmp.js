export default {
  name: 'book-preview',
  props: ['book', 'bookId'],
  template: `
             <div class="book-preview">
                 <img :src="showImg"/>
                 <h2>{{book.title}}</h2>
                 <p>{{bookPrice}}</p>
            </div>
  `,
  computed: {
    bookPrice() {
      const { currencyCode, amount } = this.book.listPrice;
      return Intl.NumberFormat('he', { style: 'currency', currency: currencyCode }).format(amount);
    },
    showImg() {
      return this.book.thumbnail ? this.book.thumbnail : 'img/noImag.jpg';
    },
  },
};
