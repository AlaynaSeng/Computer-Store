import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index"
// const conn = require('./dbconnection/dbconnect');

// conn.connect(err => {
//     if (err) throw err;
//     console.log('Connected to MySQL DB');
// });


const app = createApp(App)
app.use(router)

app.mount('#app')
