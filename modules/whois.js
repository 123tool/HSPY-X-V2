const { exec } = require('child_process');

function getWhois(domain) {
    return new Promise((resolve) => {
        exec(`whois ${domain}`, (err, stdout) => {
            if (err) resolve("Whois command not found. Install it first.");
            resolve(stdout || "No whois data.");
        });
    });
}
module.exports = getWhois;
