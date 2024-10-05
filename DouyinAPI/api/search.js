const axios = require('axios');

const performSearch = async (req, res) => {
    try {
        const query = req.query.q;
        const url = `https://www.douyin.com/search/${encodeURIComponent(query)}`;
        const response = await axios.get(url);
        res.json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error during search', error });
    }
};

module.exports = { performSearch };
