const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

function searchEDB(software) {
    return new Promise((resolve) => {
        let results = [];
        const csvPath = path.join(__dirname, '../data/exploits.csv');
        
        if (!fs.existsSync(csvPath)) return resolve(["Database exploits.csv not found."]);

        fs.createReadStream(csvPath)
            .pipe(csv())
            .on('data', (row) => {
                if (row.description.toLowerCase().includes(software.toLowerCase())) {
                    results.push(`ID: ${row.id} | ${row.description}`);
                }
            })
            .on('end', () => {
                resolve(results.slice(0, 10)); // Ambil 10 teratas
            });
    });
}
module.exports = searchEDB;
