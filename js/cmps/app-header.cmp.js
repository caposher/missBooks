export default {
  name: 'app-header',
  template: `
    <header class="app-header">
    <h2>MissBooks</h2>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/books">Books</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    </header>
    `,
};
