const express = require('express');
const douyin = require('./DouyinAPI/douyin');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/search', douyin.search);
app.get('/video', douyin.video);
app.get('/slide', douyin.slide);
app.get('/user', douyin.user);
app.get('/title', douyin.title);
app.get('/hashtags', douyin.hashtags);
app.get('/likes', douyin.likes);
app.get('/comments', douyin.comments);
app.get('/share', douyin.share);
app.get('/favorite', douyin.favorite);
app.get('/trending', douyin.trending);
app.get('/sound', douyin.sound);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
