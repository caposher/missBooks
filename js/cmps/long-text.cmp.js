export default {
  name: 'long-text',
  props: ['txt'],
  template: `
  <p class="long-text">{{trimText.txt}} <span v-if="txt.length > 100" class="read-more" @click="readMore" >{{trimText.isMore}}</span></p>
  `,
  data() {
    return {
      showAllText: false,
    };
  },
  methods: {
    readMore(ev) {
      //   debugger;
      ev.stopPropagation();
      this.showAllText = !this.showAllText;
    },
  },

  computed: {
    trimText() {
      let chars = this.showAllText ? this.txt : this.txt.slice(0, 100) + '... ';
      return { txt: chars, isMore: chars.length <= 100 + 4 ? 'Read More' : 'Read Less' };
    },
  },
};
