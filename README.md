# 🌾 Wheat Vision - Agronomic Simulation Engine

> Un simulatore Full-Stack per l'analisi predittiva della resa agricola basato su dati meteorologici reali e modelli statistici avanzati.

## 🔗 Live Demo
🚀 **Prova l'applicazione Online:** [https://wheat-vision.vercel.app/](https://wheat-vision.vercel.app/)

---
## 🛠️ Tech Stack & Tools

Il progetto utilizza uno stack **MERN** moderno, ottimizzato per performance e scalabilità.

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-000000?style=for-the-badge&logo=css3&logoColor=white)

* **Core:** React 18 (Hooks-based architecture).
* **Build Tool:** Vite (per Hot Module Replacement istantaneo e build ottimizzata).
* **Data Viz:** Chart.js + React-Chartjs-2 per la renderizzazione dei grafici complessi.
* **Styling:** CSS Modules per lo scoping locale degli stili e zero conflitti CSS.
* **Routing:** React Router v6 per la navigazione SPA (Single Page Application).

### Backend
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

* **Runtime:** Node.js.
* **Framework:** Express.js (RESTful API).
* **Database:** MongoDB Atlas (NoSQL) con Mongoose ODM.
* **Features:** Transazioni ACID, Aggregation Pipeline, Gestione Errori Centralizzata.

### Infrastructure & DevOps
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)

* **Frontend Deploy:** Vercel (CI/CD automatica da GitHub).
* **Backend Deploy:** Render (Web Service con auto-deploy).
* **Monitoring:** Cron-Job.org per Heartbeat/Keep-Alive del server.

---

## 💡 About The Project

**Wheat Vision** nasce come Project Work finale per il corso di laurea in **Informatica per le aziende digitali** presso l'**Università Telematica Pegaso**.

L'obiettivo è fornire agli agronomi uno strumento per prevedere la resa delle colture di grano duro, simulando l'interazione tra decisioni umane (semina, fertilizzanti) e variabili climatiche stocastiche.

### 🔬 Core Simulation Logic
Il motore di simulazione è strutturato in 4 fasi sequenziali:

1.  **🌱 Calcolo della Resa Teorica**
    Il sistema calcola il potenziale produttivo ideale basandosi sugli input dell'utente: periodo ed ettari di semina, densità, peso dei semi, germinabilità e dosaggio dei fertilizzanti (NPK).

2.  **☁️ Generazione Meteorologica Stocastica**
    Invece di usare dati casuali, il sistema scarica lo storico climatico (tramite API OpenMeteo) e lo rimodella usando distribuzioni statistiche per creare scenari futuri realistici:
    * **Distribuzione Normale (Gauss):** Per temperatura e umidità.
    * **Distribuzione Gamma & Bernoulli:** Per modellare intensità e frequenza delle precipitazioni.

3.  **⏱️ Simulazione Fasi Fenologiche**
    Il motore simula la durata delle 6 fasi biologiche del grano (*Germinazione, Accestimento, Levata, Spigatura, Fioritura, Maturazione*). Le durate non sono fisse, ma si adattano dinamicamente in base alle condizioni climatiche generate.

4.  **📊 Calcolo Resa Effettiva**
    La fase finale combina i fattori nutrizionali (fertilizzanti) con lo stress meteorologico accumulato in ogni fase fenologica per restituire una stima precisa della resa effettiva in tonnellate.


---

## ⚙️ Key Technical Features

Il progetto si distingue per l'uso di pattern architetturali avanzati e soluzioni custom per garantire affidabilità e precisione scientifica.

### 🎨 Frontend Engineering & UX
L'interfaccia non è solo "grafica", ma un'applicazione React ingegnerizzata per scalabilità e performance:

* **Modular Component System:** L'UI è costruita su componenti riutilizzabili e isolati (es. `SimulationCard`, `InputField`), ognuno con il proprio stile locale grazie ai **CSS Modules**. Questo evita conflitti di classi globali e garantisce un codice manutenibile.
* **Performance Optimization:** Utilizzo strategico di React Hooks come `useCallback` per memoizzare le funzioni di fetch (es. `fetchFormData`), prevenendo re-render inutili dei componenti figli e garantendo fluidità anche con mole di dati elevata.
* **Reactive State Management:** La Dashboard gestisce stati complessi e interdipendenti (lista simulazioni vs dettagli simulazione) con un flusso dati unidirezionale, aggiornando la vista in tempo reale senza ricaricamenti di pagina (SPA) dopo operazioni CRUD.

### 📊 Advanced Data Visualization (Frontend)
Il sistema di visualizzazione dati è costruito su **Chart.js** con configurazioni custom per adattare grafici standard a specifiche esigenze agronomiche:

* **Mixed-Mode Time Series:** Ho implementato un grafico complesso che combina **Line Chart** (per la temperatura) e **Bar Chart** (per precipitazioni e umidità) nello stesso canvas `CombinedPhaseGraphs`. Questo permette agli agronomi di correlare visivamente l'impatto delle piogge sull'andamento termico in un'unica timeline dinamica generata client-side.
* **Custom Gauge Charts:** Ho manipolato le opzioni standard di Chart.js (`rotation: 270`, `circumference: 180`) per trasformare un classico grafico a ciambella in un **Half-Doughnut Gauge**. Questo componente visualizza intuitivamente il raggiungimento del fabbisogno idrico (Precipitazioni Teoriche vs Simulate) come se fosse un tachimetro.
* **Comparative Analytics:** Utilizzo di grafici a barre affiancate per il confronto diretto "A/B Testing" tra i valori teorici ideali e i risultati della simulazione stocastica.

### 🏗️ Scalable Layered Architecture
Il backend segue rigorosamente il pattern **Controller-Service** per la separazione delle responsabilità:
* **Controllers:** Gestiscono esclusivamente le richieste HTTP, la validazione degli input e le risposte al client.
* **Services:** Contengono tutta la business logic (calcoli, chiamate al DB), rendendo il codice riutilizzabile e indipendente dal framework web.

### 🛡️ Data Integrity & ACID Transactions
Per garantire la consistenza dei dati tra report e simulazioni, ho implementato le **Transazioni MongoDB**.
Invece di salvataggi sequenziali rischiosi, il sistema utilizza `mongoose.startSession()` per eseguire le operazioni in modo atomico: se il calcolo della simulazione fallisce, il database esegue il rollback automatico, evitando "dati orfani" o corrotti.
> 📂 *Code Reference:* `backend/service/simulationServices.js`

### 🎲 Statistical Weather Engine
Il motore di simulazione non utilizza generatori casuali standard (`Math.random`).
Ho sviluppato un algoritmo stocastico che modella i dati meteorologici reali utilizzando distribuzioni di probabilità specifiche per l'agronomia:
* **Distribuzione Normale**: Per modellare realisticamente temperatura e umidita'
* **Distribuzione Gamma:** Per modellare realisticamente la varianza e l'intensità delle precipitazioni.
* **Distribuzione Bernoulli:** Per determinare la probabilità binaria di pioggia in un dato giorno.
> 📂 *Code Reference:* `backend/simulation/weatherGeneration/helpers/calcDistributions.js`

### 🏗️ Robust Error Handling
L'applicazione implementa un'architettura di gestione errori centralizzata.
Un middleware custom intercetta tutte le eccezioni (sincrone e asincrone) normalizzando le risposte HTTP ed evitando il crash del processo Node.js, garantendo stabilità anche in caso di input imprevisti.
> 📂 *Code Reference:* `backend/middlewares/errorHandler.js`

### 🚀 Smart DevOps & Zero-Downtime
Per superare i limiti del "Cold Start" tipici dei serverless tier gratuiti (Render), ho ingegnerizzato una soluzione di **Heartbeat attivo**.
Una rotta dedicata (`/health/checkLiveState`) esegue un ping leggero (`{ ping: 1 }`) al database MongoDB. Questo mantiene "calda" la connessione e attivo il container durante gli orari lavorativi, garantendo una risposta immediata dell'API senza costi aggiuntivi.
> 📂 *Code Reference:* `backend/routes/heartBeat.js`

---

## 🚀 Local Execution

Vuoi testare il progetto in locale? Segui questi passaggi per avviare sia il server che il client.

### Prerequisites
Assicurati di avere installato sul tuo computer:
* [Node.js](https://nodejs.org/) (v16 o superiore)
* [Git](https://git-scm.com/)
* Un account [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (o un'istanza MongoDB locale)

### 1. Clona la repository
```bash
git clone [https://github.com/IL-TUO-USERNAME/WheatVision.git](https://github.com/IL-TUO-USERNAME/WheatVision.git)
cd WheatVision
```

### 2. Backend Setup (Server)

Configura e avvia il server API.

```Bash
cd backend
npm install
```

Crea un file `.env` nella cartella `backend` e inserisci le tue variabili: 
```env 
PORT=5000
MONGO_URI=la_tua_stringa_di_connessione_mongodb
```

Avvia il server: 
```bash
# Avvio in modalita' produzione
npm start

# OPPURE avvio in modalita' sviluppo con Nodemon (se installato)
npm run dev
```

Il server partirà su `http://localhost:5000` e si connetterà a MongoDB.

### 3. Frontend Setup (Client)

Apri un nuovo terminale e configura React.

```bash
cd frontend
npm install
```

Crea un file `.env` nella cartella `frontend` per collegarlo al backend locale:
```env
VITE_API_URL=http://localhost:5000
```

Avvia l'applicazione:
```Bash
npm run dev
```
	
Vite avvierà il client (solitamente su `http://localhost:5173`). Apri quel link nel browser.
