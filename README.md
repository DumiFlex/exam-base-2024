# Exam Base 2024 - README

## 📋 Cerințe

Pentru a putea rula această aplicație, asigură-te că ai instalate următoarele:

- **Node.js** (versiunea 18+ recomandată) - [Descarcă Node.js](https://nodejs.org/)
- **npm** (sau yarn, pnpm, dacă preferi)

## ⚙️ Instalare

1. Clonează repository-ul proiectului:

   ```sh
   git clone https://github.com/DumiFlex/exam-base-2024.git
   cd exam-base-2024
   ```

2. Instalează dependențele pentru server și client:

   ```sh
   cd server
   npm install
   ```

   ```sh
   cd ../client
   npm install
   ```

3. Creează o copie a fișierului `.env.example` cu numele `.env` în folderul **server**:

   - Manual: Navighează în folderul **server** și creează o copie a fișierului `.env.example` cu numele `.env`.
   - Prin terminal:
     ```sh
     cd server
     cp .env.example .env  # Pentru Linux/Mac
     copy .env.example .env  # Pentru Windows (Command Prompt)
     ```

4. Resetează baza de date pentru a inițializa datele de test:
   ```sh
   cd server
   npm run reset-db
   ```

## 🚀 Rulare Aplicație

### 1️⃣ **Pornirea Serverului (Backend)**

1. Deschide un terminal nou și navighează în folderul **server**:
   ```sh
   cd server
   ```
2. Rulează scriptul pentru a inițializa baza de date și a porni serverul:
   ```sh
   npm run start
   ```
   - Alternativ, pentru rulare în modul de dezvoltare (cu auto-restart):
     ```sh
     npm run dev
     ```
3. Api-ul va fi disponibil la: **http://localhost:8080**. (Sau la alt port, dacă este specificat în fișierul `.env`).

### 2️⃣ **Pornirea Clientului (Frontend)**

1. Deschide un al doilea terminal și navighează în folderul **client**:
   ```sh
   cd client
   ```
2. Rulează aplicația React:
   ```sh
   npm run start
   ```
3. Aplicația va fi disponibilă la: **http://localhost:3000**. (Se va deschide automat în browser).

## 🗃️ Resetarea Bazei de Date

Dacă ai nevoie să resetezi baza de date, rulează următoarea comandă în folderul **server**:

```sh
npm run reset-db
```

Aceasta va șterge fișierul `db.sqlite` și va reîncărca datele de test.

## 🔑 Date de autentificare predefinite

Pentru a accesa aplicația, poți folosi următoarele credențiale predefinite:

| Email                | Parolă  | Tip utilizator |
| -------------------- | ------- | -------------- |
| andrei@nowhere.net   | welcome | regular        |
| andrei@somewhere.net | welcome | regular        |
| andrei@admin.net     | welcome | admin          |

## ❗ Probleme Frecvente

### 1. **Eroare `EBUSY: resource busy or locked` la resetarea bazei de date**

- Asigură-te că serverul este oprit înainte de resetare.
- Închide orice program care accesează `db.sqlite` (ex. SQLite Browser, VS Code etc.).

### 2. **Portul este deja utilizat**

- Dacă serverul sau clientul nu pornesc din cauza unui port ocupat, încearcă să închizi procesele care folosesc portul cu comanda:
  ```sh
  npx kill-port 3000 8080
  ```
