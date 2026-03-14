# n8n Workflow Automation con Claude Code

## Riferimenti Progetto

**Progetto:** Hackaton Jenia n8n
**URL Istanza:** https://fedemaso.app.n8n.cloud
**Scopo:** Automation workflow sperimentali e prototipazione per hackaton

---

## Git: Commit e Push (OBBLIGATORIO)

**REGOLA CRITICA:** Dopo ogni modifica a file del progetto (workflow, docs, planning, scripts), DEVI:

1. `git add` dei file modificati
2. `git commit` con messaggio descrittivo
3. `git push origin master`

Non lasciare mai modifiche non committate o non pushate al termine di un prompt.

---

## Credenziali e API (AUTO-LOADED)

**IMPORTANTE: Queste credenziali sono disponibili in ogni sessione Claude Code. NON chiedere le credenziali all'utente.**

### n8n Cloud (REST API per creare/gestire workflow)

- **URL Istanza:** `https://fedemaso.app.n8n.cloud`
- **API Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlZjFmNzYyNC1mMWM4LTRiN2ItYTE4OS02YTQ3OGQ0MDUyOWIiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiNGM5Yzk3ZDQtNGRlYS00NGI4LWJkMzMtMzllMzg0MWFiOTYzIiwiaWF0IjoxNzczNDc5ODY5LCJleHAiOjE3NzYwMzEyMDB9.YiZW-9XW1fov3lY09gn_22WFKW8D732YbTn9_lFx-fw`
- **Header:** `X-N8N-API-KEY: <api key sopra>`

### n8n-mcp Hosted Service (MCP per ricerca nodi/validazione)

- **Configurazione:** Vedi `mcp.json` nel progetto

---

## Come Creare Workflow su n8n Cloud (Istruzioni Operative)

Il server MCP n8n fornisce SOLO strumenti di ricerca/validazione. Per CREARE workflow direttamente sull'istanza n8n Cloud, usa la REST API via curl.

### Creare un workflow:

```bash
curl -s -X POST "https://fedemaso.app.n8n.cloud/api/v1/workflows" \
  -H "Content-Type: application/json" \
  -H "X-N8N-API-KEY: <api key n8n cloud>" \
  -d '<workflow JSON>'
```

### Elencare i workflow:

```bash
curl -s "https://fedemaso.app.n8n.cloud/api/v1/workflows" \
  -H "X-N8N-API-KEY: <api key n8n cloud>"
```

### Ottenere un workflow specifico:

```bash
curl -s "https://fedemaso.app.n8n.cloud/api/v1/workflows/<ID>" \
  -H "X-N8N-API-KEY: <api key n8n cloud>"
```

### Aggiornare un workflow:

```bash
curl -s -X PUT "https://fedemaso.app.n8n.cloud/api/v1/workflows/<ID>" \
  -H "Content-Type: application/json" \
  -H "X-N8N-API-KEY: <api key n8n cloud>" \
  -d '<workflow JSON aggiornato>'
```

### Flusso di lavoro combinato:

1. **MCP Server** -> cerca nodi, valida configurazioni, consulta template
2. **REST API** -> crea/modifica/elimina workflow direttamente su n8n Cloud
3. **Fornisci SEMPRE** il link `https://fedemaso.app.n8n.cloud/workflow/[ID]` + JSON export

---

## Descrizione Progetto

Questo progetto permette a Claude Code di costruire workflow n8n di alta qualita' in modo automatizzato. Utilizzando il server MCP n8n e le n8n skills specializzate, Claude puo' creare workflow complessi e production-ready per la tua istanza n8n Cloud.

**Output Garantito per Ogni Workflow:**

- **Link diretto** al workflow su n8n Cloud (apribile immediatamente nel browser)
- **JSON export completo** del workflow (per backup e import manuale)

**Stack Tecnologico:**

- n8n Cloud (piattaforma di workflow automation)
- n8n MCP Server (accesso a 1,084 nodi n8n) - solo ricerca/validazione
- n8n Cloud REST API - per creare/gestire workflow
- n8n Skills (7 skills specializzate per Claude Code)

---

## Istruzioni per Claude Code

**REGOLA OBBLIGATORIA:** Quando l'utente richiede la creazione di un workflow n8n, **DEVI SEMPRE** fornire:

1. ✅ **Link diretto al workflow**
   - Formato: `https://fedemaso.app.n8n.cloud/workflow/[WORKFLOW_ID]`
   - Link cliccabile che apre il workflow nell'istanza n8n Cloud dell'utente
   - Deve essere fornito PRIMA del JSON

2. ✅ **JSON export completo del workflow**
   - Tutto il contenuto del workflow in formato JSON
   - Include: name, nodes, connections, settings
   - Formattato in modo leggibile

**NON è accettabile fornire solo uno dei due.** Entrambi sono obbligatori per ogni workflow.

**Esempio di output corretto:**

````
Ho creato il workflow richiesto!

🔗 **Workflow URL:** https://fedemaso.app.n8n.cloud/workflow/ABC123XYZ
Clicca il link sopra per aprire il workflow nella tua istanza n8n Cloud.

📄 **JSON Export:**
```json
{
  "name": "Nome del Workflow",
  "nodes": [...],
  "connections": {...},
  "settings": {...}
}
````

````

---

## Setup - Installazione MCP Server

### Metodo 1: Hosted Service (Raccomandato)

Il metodo più semplice e veloce, senza necessità di manutenzione:

1. **Registrati al servizio hosted:**
   - Visita: https://dashboard.n8n-mcp.com
   - Crea un account gratuito
   - Piano gratuito: 100 chiamate/giorno

2. **Ottieni la tua API key:**
   - Dalla dashboard, copia la tua API key personale

3. **Configura Claude Code:**
   - Apri il file di configurazione MCP:
     - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
     - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
     - Linux: `~/.config/Claude/claude_desktop_config.json`

4. **Aggiungi la configurazione:**
   ```json
   {
     "mcpServers": {
       "n8n-mcp": {
         "command": "npx",
         "args": ["n8n-mcp"],
         "env": {
           "N8N_MCP_API_KEY": "la-tua-api-key-qui"
         }
       }
     }
   }
````

5. **Riavvia Claude Code/Claude Desktop**

**Vantaggi:**

- Nessuna installazione locale
- Sempre aggiornato con gli ultimi nodi n8n
- Zero manutenzione
- Backup automatico

### Metodo 2: Docker (Alternativo)

Per chi preferisce maggiore controllo e deployment locale:

1. **Scarica l'immagine Docker:**

   ```bash
   docker pull ghcr.io/czlonkowski/n8n-mcp:latest
   ```

2. **Configura Claude Code:**
   Aggiungi al file `claude_desktop_config.json`:

   ```json
   {
     "mcpServers": {
       "n8n-mcp": {
         "command": "docker",
         "args": [
           "run",
           "-i",
           "--rm",
           "--init",
           "-e",
           "MCP_MODE=stdio",
           "-e",
           "LOG_LEVEL=error",
           "-e",
           "DISABLE_CONSOLE_OUTPUT=true",
           "-e",
           "N8N_API_URL=https://tuaistanza.app.n8n.cloud",
           "-e",
           "N8N_API_KEY=la-tua-api-key-n8n",
           "ghcr.io/czlonkowski/n8n-mcp:latest"
         ]
       }
     }
   }
   ```

3. **Riavvia Claude Code/Claude Desktop**

**Note importanti per Docker:**

- `MCP_MODE=stdio` è obbligatorio per la compatibilità
- `DISABLE_CONSOLE_OUTPUT=true` previene errori di parsing JSON
- Sostituisci `N8N_API_URL` con l'URL della tua istanza n8n Cloud
- Sostituisci `N8N_API_KEY` con la tua API key n8n (vedi sezione successiva)

---

## Configurazione n8n Cloud

### Ottenere l'API Key da n8n Cloud

1. **Accedi a n8n Cloud:**
   - Vai su https://app.n8n.cloud
   - Effettua il login con il tuo account

2. **Genera un API Key:**
   - Clicca sul tuo avatar in alto a destra
   - Vai su "Settings" → "API"
   - Clicca su "Create API Key"
   - Copia la key generata (la vedrai solo una volta!)
   - Salva la key in un posto sicuro

3. **Trova l'URL della tua istanza:**
   - L'URL sarà nel formato: `https://tuaistanza.app.n8n.cloud`
   - Lo trovi nella barra degli indirizzi quando sei loggato

4. **Configura le credenziali nel MCP server:**
   - Se usi il metodo hosted: non serve configurare URL/API key n8n
   - Se usi Docker: inserisci URL e API key nelle variabili d'ambiente (vedi sopra)

---

## Setup - Installazione n8n Skills

### Installazione Rapida

Esegui questo comando in Claude Code:

```
/plugin install czlonkowski/n8n-skills
```

Questo installerà tutte e 7 le skills automaticamente.

### Le 7 Skills e la loro Funzione

1. **n8n Expression Syntax**
   - Insegna la sintassi corretta delle espressioni n8n
   - Si attiva quando: scrivi espressioni `{{}}`, accedi a variabili `$json` o `$node`
   - Esempi: `{{ $json.data }}`, `{{ $now.toISO() }}`

2. **n8n MCP Tools Expert** ⭐ PRIORITÀ MASSIMA
   - Guida l'uso efficace degli strumenti n8n-mcp
   - Si attiva quando: cerchi nodi, validi workflow, accedi a template
   - Funzione critica: orchestrazione di tutte le operazioni MCP

3. **n8n Workflow Patterns**
   - Fornisce 5 pattern architetturali provati
   - Si attiva quando: crei workflow, connetti nodi, progetti automazioni
   - Pattern comuni: webhook triggers, scheduled jobs, data transformation

4. **n8n Validation Expert**
   - Interpreta e risolve errori di validazione
   - Si attiva quando: la validazione fallisce, serve debugging
   - Aiuta a: correggere configurazioni errate, risolvere dipendenze

5. **n8n Node Configuration**
   - Guida specifica per la configurazione dei nodi
   - Si attiva quando: configuri nodi, imposti workflow AI
   - Copre: 525+ nodi con esempi operation-specific

6. **n8n Code JavaScript**
   - Assistenza per Code nodes JavaScript
   - Si attiva quando: usi Code nodes, fai richieste HTTP, manipoli dati
   - Include: pattern comuni, best practices, troubleshooting

7. **n8n Code Python**
   - Supporto per Code nodes Python
   - Si attiva quando: usi Python Code nodes
   - Include: consapevolezza delle limitazioni, librerie disponibili

### Verifica Installazione

Dopo l'installazione, verifica che le skills siano attive:

```
/skills list
```

Dovresti vedere tutte le 7 n8n skills elencate.

---

## Come Usare il Sistema

### Formato delle Richieste

Quando vuoi creare un workflow, descrivi chiaramente cosa vuoi ottenere:

**Esempio di richiesta base:**

```
Crea un workflow n8n che:
- Riceve dati tramite webhook
- Estrae il campo "email" dal payload
- Invia un messaggio Slack con l'email ricevuta
```

**Esempio di richiesta avanzata:**

```
Costruisci un workflow n8n per:
- Trigger: ogni giorno alle 9:00
- Legge nuovi record da un Google Sheet
- Per ogni record, controlla se l'email è valida
- Se valida, invia email di benvenuto tramite Gmail
- Se non valida, logga in un altro Google Sheet
- Invia notifica riepilogativa su Slack
```

### Formato dell'Output

**IMPORTANTE:** Ogni volta che Claude crea un workflow, **DEVE SEMPRE** fornire ENTRAMBI:

1. **Link diretto al workflow** (formato clickable):

   ```
   🔗 Workflow URL: https://fedemaso.app.n8n.cloud/workflow/[ID_WORKFLOW]
   ```

   - Questo link ti permette di aprire immediatamente il workflow nella tua istanza n8n Cloud
   - Puoi cliccare e iniziare subito a usare/modificare il workflow

2. **JSON Export completo** per backup/import:
   ```json
   {
     "name": "Nome Workflow",
     "nodes": [...],
     "connections": {...},
     "settings": {...}
   }
   ```

   - Salva questo JSON come backup
   - Utile per versionamento e import in altre istanze

**Non accettare risposte che forniscono solo uno dei due!** Entrambi sono obbligatori per ogni workflow creato.

### Come Importare un Workflow da JSON

Se vuoi importare manualmente un workflow dal JSON:

1. Copia il JSON fornito da Claude
2. Vai su n8n Cloud
3. Clicca "Add workflow" → "Import from File"
4. Incolla il JSON e clicca "Import"

---

## Best Practices

### 1. Descrivi i Requisiti in Modo Chiaro

**Buono:**

```
Crea un workflow che monitora una cartella Google Drive,
e quando viene aggiunto un nuovo PDF, lo invia via email
all'indirizzo specificato nel nome del file (formato: email@example.com_documento.pdf)
```

**Da evitare:**

```
Voglio qualcosa con Drive e email
```

### 2. Specifica i Trigger

Indica sempre come vuoi attivare il workflow:

- **Webhook**: per integrazioni esterne o API
- **Schedule**: per task ricorrenti (es: "ogni giorno alle 9:00")
- **Manual**: per esecuzioni manuali
- **Polling**: per monitorare cambiamenti (es: nuovi email, file)

### 3. Definisci la Logica di Business

Se ci sono condizioni o trasformazioni:

```
- Se il valore è > 100, invia notifica urgente
- Altrimenti, aggiungi a una lista di revisione
- Formatta la data in formato europeo (DD/MM/YYYY)
```

### 4. Indica le Credenziali Necessarie

Menziona quali servizi userai:

```
Userò le mie credenziali per:
- Slack (workspace "MioTeam")
- Gmail (account personale)
- Google Sheets (documento "Vendite 2026")
```

### 5. Per Workflow Complessi, Usa Step Incrementali

Invece di chiedere tutto in una volta:

```
Step 1: Crea un workflow base webhook → Slack
Step 2: Aggiungi validazione dati
Step 3: Aggiungi gestione errori
Step 4: Aggiungi logging su Google Sheets
```

---

## Esempi di Workflow Comuni

### Esempio 1: Webhook → Notifica Slack

```
Crea un workflow che:
- Trigger: Webhook
- Riceve: { "message": "testo", "user": "nome" }
- Invia su Slack: "Nuovo messaggio da {user}: {message}"
```

### Esempio 2: Schedule → Report Email

```
Crea un workflow che:
- Trigger: Schedule (ogni lunedì alle 9:00)
- Legge dati da Google Sheets "Report Settimanale"
- Genera un riepilogo HTML
- Invia email con il report a team@example.com
```

### Esempio 3: Monitor → Azione Condizionale

```
Crea un workflow che:
- Trigger: Polling Gmail ogni 5 minuti
- Cerca email con oggetto "URGENTE"
- Se trovate:
  - Invia notifica Slack immediata
  - Crea task su Todoist con priorità massima
  - Inoltra email a manager@example.com
```

### Esempio 4: Data Transformation

```
Crea un workflow che:
- Trigger: Webhook
- Riceve array di oggetti: [{ "name": "...", "value": "..." }]
- Trasforma i dati:
  - Filtra valori > 50
  - Aggiungi timestamp
  - Calcola media e totale
- Salva risultato su Google Sheets
```

---

## Troubleshooting

### MCP Server non Connesso

**Sintomo:** Claude non riesce a cercare nodi o accedere alla documentazione n8n

**Soluzioni:**

1. Verifica che il file di configurazione MCP sia corretto
2. Controlla che Claude Code sia stato riavviato dopo le modifiche
3. Se usi Docker, verifica che il container sia in esecuzione:
   ```bash
   docker ps | grep n8n-mcp
   ```
4. Controlla i log di Claude Code per errori MCP
5. Se usi hosted service, verifica che la tua API key sia valida

### Skills non Attive

**Sintomo:** Claude non sembra usare le conoscenze n8n

**Soluzioni:**

1. Verifica installazione: `/skills list`
2. Reinstalla se necessario: `/plugin install czlonkowski/n8n-skills`
3. Riavvia Claude Code
4. Prova a menzionare esplicitamente "usa le n8n skills"

### API Key n8n Cloud non Funziona

**Sintomo:** Errore di autenticazione con n8n Cloud

**Soluzioni:**

1. Verifica che l'API key sia copiata correttamente (senza spazi)
2. Controlla che l'API key non sia scaduta
3. Genera una nuova API key da n8n Cloud
4. Verifica che l'URL dell'istanza sia corretto (include `https://`)

### Workflow non si Apre

**Sintomo:** Il link al workflow genera errore 404

**Soluzioni:**

1. Verifica di essere loggato su n8n Cloud
2. Controlla che il workflow esista nella tua istanza
3. Usa il JSON export per importare manualmente il workflow

### Errori di Validazione nel Workflow

**Sintomo:** Il workflow ha errori quando lo apri

**Soluzioni:**

1. Chiedi a Claude di "validare e correggere il workflow"
2. Verifica che tutte le credenziali necessarie siano configurate in n8n
3. Controlla che i nodi usati siano disponibili nella tua versione di n8n Cloud
4. La skill "n8n Validation Expert" dovrebbe attivare automaticamente per risolvere

---

## Risorse Utili

### Documentazione Ufficiale

- [n8n MCP Server - GitHub](https://github.com/czlonkowski/n8n-mcp)
- [n8n Skills - GitHub](https://github.com/czlonkowski/n8n-skills)
- [n8n Cloud Documentation](https://docs.n8n.io/hosting/cloud/)
- [n8n Node Reference](https://docs.n8n.io/integrations/)

### Dashboard e Tools

- [n8n MCP Hosted Service](https://dashboard.n8n-mcp.com)
- [n8n Cloud Console](https://app.n8n.cloud)
- [n8n Community Forum](https://community.n8n.io)

### Template e Esempi

- [n8n Workflow Templates](https://n8n.io/workflows)
- Oltre 2,653 template disponibili tramite MCP server

---

## Note Finali

### Privacy e Telemetria

Il server MCP n8n include telemetria opzionale. Per disabilitarla:

```json
{
  "mcpServers": {
    "n8n-mcp": {
      ...
      "env": {
        "N8N_MCP_TELEMETRY_DISABLED": "true"
      }
    }
  }
}
```

### Limitazioni Free Tier

**Hosted Service:**

- 100 chiamate MCP al giorno
- Accesso completo a tutti i nodi
- Nessuna scadenza

**n8n Cloud Free:**

- Limiti variabili (consulta la documentazione n8n)
- Workflow execution limits

### Supporto

Per problemi o domande:

- Issues n8n-mcp: https://github.com/czlonkowski/n8n-mcp/issues
- Issues n8n-skills: https://github.com/czlonkowski/n8n-skills/issues
- n8n Community: https://community.n8n.io

---

## Inizia Subito

Ora che hai completato il setup, prova a creare il tuo primo workflow:

```
Crea un semplice workflow n8n che riceve un webhook e invia
un messaggio "Hello World" su Slack nel canale #general
```

Claude utilizzerà automaticamente le skills e il server MCP per costruire un workflow completo, validato e pronto all'uso!

**Ricorda:** Riceverai SEMPRE sia il link diretto che il JSON del workflow. Se Claude non fornisce entrambi, richiedi esplicitamente: _"Fornisci il link al workflow e il JSON export"_.

test
