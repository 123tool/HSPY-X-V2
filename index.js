const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const colors = require('colors');

// Import Modules Logika Mesin
const getSubdomains = require('./modules/crtsh');
const getWayback = require('./modules/wayback');
const getWhois = require('./modules/whois');
const searchEDB = require('./modules/edb');
const runDorks = require('./modules/dorker');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware
app.use(express.static('public'));
app.use(express.json());

// Socket.io Real-time Logic
io.on('connection', (socket) => {
    console.log('[!]'.yellow + ' New connection to Intelligence Hub'.white);

    socket.on('start-scan', async (data) => {
        const { target, engines } = data; // engines adalah array dari checkbox yang dicentang
        
        socket.emit('log', { msg: `INITIALIZING RECON: ${target}`, type: 'info' });

        try {
            // 1. Subdomain Scanner (crt.sh)
            if (engines.includes('subdomain')) {
                socket.emit('log', { msg: 'Fetching Subdomains from SSL Certificates...', type: 'process' });
                const subs = await getSubdomains(target);
                socket.emit('result', { module: 'Subdomain', data: subs });
            }

            // 2. Wayback Machine
            if (engines.includes('wayback')) {
                socket.emit('log', { msg: 'Extracting Archives from Wayback Machine...', type: 'process' });
                const archive = await getWayback(target);
                socket.emit('result', { module: 'Wayback', data: archive });
            }

            // 3. Whois Lookup
            if (engines.includes('whois')) {
                socket.emit('log', { msg: 'Performing Whois Data Retrieval...', type: 'process' });
                const whoisData = await getWhois(target);
                socket.emit('result', { module: 'Whois', data: [whoisData] });
            }

            // 4. Google Dorking
            if (engines.includes('dorks')) {
                socket.emit('log', { msg: 'Scanning for Sensitive Files (Dorks)...', type: 'process' });
                const dorkResults = await runDorks(target);
                socket.emit('result', { module: 'Dorks', data: dorkResults });
            }

            // 5. Exploit-DB Local Search
            if (engines.includes('edb')) {
                socket.emit('log', { msg: 'Searching Local Exploit Database...', type: 'process' });
                const edbResults = await searchEDB(target);
                socket.emit('result', { module: 'Exploit-DB', data: edbResults });
            }

            socket.emit('log', { msg: 'SCAN COMPLETED SUCCESSFULLY!', type: 'success' });

        } catch (err) {
            console.log(err);
            socket.emit('log', { msg: `SYSTEM_ERROR: ${err.message}`, type: 'error' });
        }
    });

    socket.on('disconnect', () => {
        console.log('[x]'.red + ' User disconnected from Hub'.white);
    });
});

// Start Server
const PORT = 8080;
server.listen(PORT, () => {
    console.log('\n=========================================='.rainbow);
    console.log('   HSPY-X-V2 INTELLIGENCE COMMAND CENTER   '.bold.white);
    console.log('=========================================='.rainbow);
    console.log(`[+] Status : `.white + `ACTIVE`.green.bold);
    console.log(`[+] Address: `.white + `http://localhost:${PORT}`.cyan);
    console.log(`[+] Mode   : `.white + `NO-API RECON`.yellow);
    console.log('==========================================\n'.rainbow);
    console.log('[!] Waiting for connection...'.italic.gray);
});
