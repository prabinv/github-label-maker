import app from 'ampersand-app'
import AppRouter from './router'
import styles from './styles/main.styl'
import User from './models/user'
import icons from 'octicons/octicons/octicons.css'

window.app = app;

app.extend({
  init () {
    this.me = new User();
    this.me.fetchInitialData();
    this.router = new AppRouter();
    this.router.history.start();
  }
});

app.init();