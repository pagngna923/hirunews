const express = require('express');
const { getNews } = require('hirunews-scraper-kaveesha');
const app = express();
const PORT = 3000;

// EJS setup
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Main route
app.get('/', async (req, res) => {
    try {
        const news = await getNews();
        res.render('index', { news: news });
    } catch (error) {
        console.error('Error:', error);
        res.render('index', { news: [], error: 'News load කිරීමට නොහැකි විය' });
    }
});

// API endpoint (optional)
app.get('/api/news', async (req, res) => {
    try {
        const news = await getNews();
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
