const socket = io();
const scanBtn = document.getElementById('scanBtn');
const logs = document.getElementById('logs');
const resultsArea = document.getElementById('resultsArea');
let fullReport = "";

scanBtn.onclick = () => {
    const target = document.getElementById('targetInput').value;
    if(!target) return alert("Target is required!");
    
    resultsArea.innerHTML = ""; // Clear old results
    fullReport = `SCAN REPORT FOR: ${target}\n====================\n`;
    
    socket.emit('start-scan', { target, type: 'all' });
};

socket.on('log', (data) => {
    const p = document.createElement('p');
    p.className = data.type;
    p.innerText = `> ${data.msg}`;
    logs.appendChild(p);
    logs.scrollTop = logs.scrollHeight;
});

socket.on('result', (data) => {
    fullReport += `\n[${data.module}]\n${data.data.join('\n')}\n`;
    
    const div = document.createElement('div');
    div.className = "neo-card res-card";
    div.innerHTML = `<strong>${data.module}</strong><hr>${data.data.join('<br>')}`;
    resultsArea.appendChild(div);
});

// Export TXT
document.getElementById('downloadBtn').onclick = () => {
    const blob = new Blob([fullReport], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `HSPY-X-V2-Report.txt`;
    a.click();
};
