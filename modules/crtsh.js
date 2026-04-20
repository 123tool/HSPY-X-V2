const axios = require('axios');

async function getSubdomains(domain) {
    try {
        const res = await axios.get(`https://crt.sh/?q=${domain}&output=json`);
        return [...new Set(res.data.map(i => i.common_name))];
    } catch (e) { return ["No subdomains found or Service down"]; }
}
module.exports = getSubdomains;
