import homePage from './pages/home-page.cmp.js';
import aboutPage from './pages/about-page.cmp.js';
import bookApp from './pages/book-app.cmp.js';
import bookDetails from './pages/book-details-page.cmp.js';

const routes = [
  {
    path: '/',
    component: homePage,
  },
  {
    path: '/about',
    component: aboutPage,
  },
  {
    path: '/books',
    component: bookApp,
  },
  {
    path: '/books/:bookId',
    component: bookDetails,
  },
];

export const router = new VueRouter({ routes });
