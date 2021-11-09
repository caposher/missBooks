export default {
  name: 'book-filter',
  template: `
  <section class="book-filter">
    <form>
        <input type="text" v-model='filterBy.bookName' @input="doFilter" placeholder="Book Name">    
        <input type="number" v-model.number='filterBy.price'  @input="doFilter" placeholder="Infinity">    
    </form>  
  </section>
  `,
  data() {
    return {
      filterBy: {
        bookName: '',
        price: 0,
      },
    };
  },

  methods: {
    doFilter() {
      this.$emit('filtered', { ...this.filterBy });
    },
  },
};
