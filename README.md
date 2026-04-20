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

### 1. Update & Install Node.js
Buka terminal dan jalankan perintah berikut:
```bash
# Untuk Termux
pkg update && pkg upgrade -y
pkg install nodejs git whois -y

# Untuk Linux (Debian/Ubuntu)
sudo apt update && sudo apt install nodejs npm whois -y
