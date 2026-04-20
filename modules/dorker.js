const axios = require('axios');
const cheerio = require('cheerio');

async function runDorks(domain) {
    const dorks = [`site:${domain} filetype:sql`, `site:${domain} inurl:admin` ];
    let results = [];
    
    for (let dork of dorks) {
        try {
            // Menggunakan search engine alternatif yang lebih ramah scraping
            const res = await axios.get(`https://www.bing.com/search?q=${encodeURIComponent(dork)}`, {
                headers: { 'User-Agent': 'Mozilla/5.0' }
            });
            const $ = cheerio.load(res.data);
            $('h2 a').each((i, el) => {
                results.push($(el).attr('href'));
            });
        } catch (e) { console.log("Dork limit hit"); }
    }
    return results.length > 0 ? results : ["No sensitive files found via dorking."];
}
module.exports = runDorks;
