# Instagram API Setup Guide

## 📸 Come Ottenere il Feed Instagram sul Sito

Il sito è già configurato per mostrare i vostri post Instagram. Per ora mostra dati di esempio, ma per vedere i post veri segui questi passi:

## Step 1: Crea un'App Facebook

1. Vai su [Facebook Developers](https://developers.facebook.com/)
2. Clicca su "My Apps" → "Create App"
3. Seleziona tipo: "Consumer" o "Business"
4. Inserisci un nome (es. "Virtus Velletri Website")

## Step 2: Aggiungi Instagram Basic Display

1. Nel dashboard della tua app, vai su "Add Product"
2. Trova "Instagram Basic Display" e clicca "Set Up"
3. Scorri in basso e clicca "Create New App"
4. Compila i campi:
   - **Display Name**: Virtus Velletri
   - **Valid OAuth Redirect URIs**: `https://tuosito.com/`
   - **Deauthorize Callback URL**: `https://tuosito.com/`
   - **Data Deletion Request URL**: `https://tuosito.com/`

## Step 3: Ottieni il Token di Accesso

1. Vai su "Basic Display" → "User Token Generator"
2. Clicca "Add or Remove Instagram Testers"
3. Aggiungi il tuo account Instagram business
4. Accetta l'invito dall'app Instagram
5. Torna su Facebook Developers e genera il token
6. **COPIA IL TOKEN** (lunga stringa alfanumerica)

## Step 4: Configura il Sito

1. Nel progetto, crea un file `.env.local` nella cartella principale
2. Aggiungi questa riga:
   ```
   INSTAGRAM_ACCESS_TOKEN=il_tuo_token_qui
   ```
3. Riavvia il server (`npm run dev`)

## ✅ Fatto!

Il sito ora mostrerà automaticamente i vostri 6 post Instagram più recenti nella home page!

## 📝 Note Importanti

- Il token scade dopo 60 giorni. Dovrai rigenerarlo periodicamente
- Per token permanenti, devi convertirlo in "Long-lived token" (guida su Instagram API docs)
- I post vengono aggiornati automaticamente ogni ora

## 🆘 Problemi?

Se hai difficoltà con la configurazione API, il sito funziona comunque con i pulsanti social nel Footer. Puoi sempre aggiungere l'integrazione Instagram in seguito!

Come avviare il server locale per vedere il sito
1️⃣ Installa le dipendenze (solo la prima volta o se hai modificato package.json):

bash
cd C:\Users\fargh\.gemini\antigravity\scratch\virtus-velletri-app
npm install
2️⃣ Avvia il server di sviluppo:

bash
npm run dev
Il comando avvierà Next.js in modalità development.
L’app sarà disponibile all’indirizzo http://localhost:3000.
3️⃣ Apri il browser e naviga a:

Home page: http://localhost:3000/
Pagina “giovanili” (la nuova homepage NBA‑style): http://localhost:3000/giovanili
4️⃣ Aggiornamenti live
Ogni volta che salvi un file, Next.js ricompila automaticamente e il browser si aggiorna in tempo reale.

Suggerimenti rapidi
Arresta il server: premi Ctrl +C nella console dove è in esecuzione npm run dev.
Porta diversa: se la porta 3000 è occupata, Next.js ti chiederà di usarne un’altra (es. 3001). Basta confermare.
Ambiente di produzione (solo per test finali):
bash
