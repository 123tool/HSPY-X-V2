const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

// Import Modules
const getSubdomains = require('./modules/crtsh');
const getWayback = require('./modules/wayback');
const getWhois = require('./modules/whois');
const searchEDB = require('./modules/edb');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));
app.use(express.json());

io.on('connection', (socket) => {
    console.log('[-] User Connected to Intelligence Hub');

    socket.on('start-scan', async (data) => {
        const { target, type } = data;
        
        socket.emit('log', { msg: `[*] Starting Recon on: ${target}`, type: 'info' });

        try {
            if (type === 'subdomain' || type === 'all') {
                socket.emit('log', { msg: '[*] Fetching Subdomains from crt.sh...', type: 'process' });
                const subs = await getSubdomains(target);
                socket.emit('result', { module: 'Subdomain', data: subs });
            }

            if (type === 'wayback' || type === 'all') {
                socket.emit('log', { msg: '[*] Digging Wayback Machine Archives...', type: 'process' });
                const archive = await getWayback(target);
                socket.emit('result', { module: 'Wayback', data: archive });
            }

            if (type === 'whois' || type === 'all') {
                socket.emit('log', { msg: '[*] Running Whois Lookup...', type: 'process' });
                const whoisData = await getWhois(target);
                socket.emit('result', { module: 'Whois', data: whoisData });
            }

            socket.emit('log', { msg: '[+] Scan Completed!', type: 'success' });
        } catch (err) {
            socket.emit('log', { msg: `[!] Error: ${err.message}`, type: 'error' });
        }
    });
});

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`\x1b[32m[HSPY-X-V2] System Active on http://localhost:${PORT}\x1b[0m`);
});
