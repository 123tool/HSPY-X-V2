const axios = require('axios');

async function getWayback(domain) {
    try {
        const url = `http://web.archive.org/cdx/search/cdx?url=${domain}/*&output=json&collapse=urlkey&limit=20`;
        const res = await axios.get(url);
        res.data.shift(); // Buang header
        return res.data.map(i => i[2]); // Ambil kolom URL saja
    } catch (e) { return ["Archive not available"]; }
}
module.exports = getWayback;
