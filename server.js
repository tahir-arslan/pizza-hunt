const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require('./routes'));

// tells mongoose which db to connect to. if `MONGODB_URI` exists like on Heroku, it will
// use that. Otherwise, use local MongoDB server's database at `mongodb://127...`
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pizza-hunt', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// this logs mongo queries being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));