import { bookService } from '../services/book-service.js';

export default {
  name: 'review-add',
  template: `
  <section v-if="userReview" class="review-add">
    <form @submit.prevent="newReview">
    
    <label for="name">Your full name:</label>
    <input type="text" name="name" v-model="userReview.fullName" placeHolder="Books Reader"></br>
    <label for="rate">Your rate:</label>
    <select name="rate" v-model="userReview.rate">
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </select></br>
    <label for="read-at">Read at:</label>
    <input type="date" name="read-at" v-model="userReview.dateAt" ></br>
    <textarea class="user-txt" type="date" name="user-text" v-model="userReview.txt" placeHolder="Put your recomendation here"></textarea></br>
    <button>Submit</button>
    </form>
</section>
  `,
  data() {
    return {
      userReview: null,
    };
  },
  created() {
    this.userReview = {
      id: '',
      fullName: '',
      rate: 0,
      dateAt: '',
      txt: '',
    };
  },
  methods: {
    newReview() {
      if (!this.dateAt) this.userReview.dateAt = new Date().toLocaleDateString('en-EN');
      this.$emit('review', this.userReview);
      this.userReview = {
        id: '',
        fullName: '',
        rate: 0,
        dateAt: '',
        txt: '',
      }; //TODO: fix logic - not working good
      // bookService.addReview(this.bookId, this.userReview);
      // this.userReview = null;
    },
  },
  components: {
    bookService,
  },
};
