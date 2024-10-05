const search = require('./api/search');
const video = require('./api/video');
const slide = require('./api/slide');
const user = require('./api/user');
const title = require('./api/title');
const hashtags = require('./api/hashtags');
const likes = require('./api/likes');
const comments = require('./api/comment');
const share = require('./api/share');
const favorite = require('./api/favorite');
const trending = require('./api/trending');
const sound = require('./api/sound');
const { DouyinError } = require('./exceptions');

module.exports = {
    search: search.performSearch,
    video: video.downloadVideo,
    slide: slide.downloadSlide,
    user: user.getUserInfo,
    title: title.getTitle,
    hashtags: hashtags.getHashtags,
    likes: likes.getLikes,
    comments: comments.getComments,
    share: share.getShareInfo,
    favorite: favorite.getFavoriteInfo,
    trending: trending.getTrendingInfo,
    sound: sound.downloadSound,
    DouyinError
};
