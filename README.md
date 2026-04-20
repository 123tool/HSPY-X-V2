## 🛡️ HSPY-X-V2 : Intelligence Command Center

**HSPY-X-V2** adalah evolusi dari HSPY-X, kini hadir dengan antarmuka berbasis Web (Dashboard) yang didukung oleh Node.js. Tool ini dirancang untuk melakukan OSINT & Reconnaissance secara otomatis tanpa memerlukan API Key pihak ketiga.

---

## ⚡ Mesin Tempur
Tool ini menggabungkan 5 teknik intelijen dalam satu klik:
1.  **Google Dorking:** Mencari file sensitif & admin panel via scraping mesin pencari.
2.  **Subdomain Finder:** Ekstraksi subdomain melalui publik SSL certificate via `crt.sh`.
3.  **Wayback Machine:** Menggali arsip file lama dari `archive.org`.
4.  **Whois Lookup:** Mengambil informasi kepemilikan domain secara detail.
5.  **Offline Exploit-DB:** Pencarian celah keamanan instan menggunakan database lokal.

---

## 🛠️ Persiapan & Instalasi (Termux / Linux)

## 1. Update & Install Node.js
Buka terminal dan jalankan perintah berikut :
## Untuk Termux
```
pkg update && pkg upgrade -y
pkg install nodejs git whois -y
```
## Untuk Linux (Debian/Ubuntu)
```
sudo apt update && sudo apt install nodejs npm whois -y
```
## Clone & Setup Library
```
git clone [git clone [https://github.com/123tool/HSPY-X-V2.git](https://github.com/123tool/HSPY-X-V2.git)
cd HSPY-X-V2
termux-setup-storage
npm install
```
## Setup Database Exploit-DB :
```
mkdir -p data
wget [https://raw.githubusercontent.com/offensive-security/exploitdb/master/files_exploits.csv](https://raw.githubusercontent.com/offensive-security/exploitdb/master/files_exploits.csv) -O data/exploits.csv
```
## Cara Menjalankan
​Cukup jalankan satu perintah :
```
node index.js
```
## Akses Dashboard :
​Setelah dijalankan, buka browser (Chrome/Safari) dan ketik alamat sesuai perangkat :
​Di HP yang sama (Termux) :
```
http://localhost:8080
atau
http://127.0.0.1:8080
```
​Di Laptop/HP lain (Satu WiFi) :
```
http://IP_HP_KAMU:8080
(Contoh: http://192.168.1.4:8080)
```
## Cara Cek IP di Termux (Buat buka di browser) :
Kalau kamu buka dashboard-nya dari Chrome HP, ketik di Termux :
```bash
ifconfig
```
## Cari bagian wlan0 dan lihat angka setelah tulisan inet
```
(biasanya 192.168.x.x).
Itulah alamat yang kamu ketik di browser.
```
## Disclaimer
**​Alat ini dibuat untuk tujuan edukasi dan audit keamanan yang sah. Segala bentuk penyalahgunaan atas tool ini di luar tanggung jawab pengembang (SPY-E & 123Tool).**

​**Lisensi : MIT / GPL v3**
