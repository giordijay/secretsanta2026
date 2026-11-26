# Secret Santa 2026 – Piano di sviluppo

SPA React senza backend: un utente fa login e vede chi gli è stato assegnato (nome + foto).
Dati (utenti, password, abbinamenti) statici nel codice: scelta voluta, è un progetto di studio.

## 1. Stack

| Ambito | Scelta | Perché |
|---|---|---|
| Build / dev server | **Vite** + React 18 + TypeScript | setup minimo, avvio veloce |
| UI | **MUI** (`@mui/material`, `@emotion/react`, `@emotion/styled`, `@mui/icons-material`) | come richiesto |
| Routing | nessuno | due schermate soltanto: basta uno stato `currentUser` |
| Stato | `useState` in `App` + `sessionStorage` | il login resta valido se si ricarica la pagina, ma sparisce chiudendo la scheda |
| Test | Vitest + React Testing Library | per verificare login e abbinamenti |

## 2. Struttura

```
xmas2026/
├─ public/
├─ src/
│  ├─ assets/participants/   ← le 7 foto spostate da images/
│  ├─ data/participants.ts   ← utenti, credenziali, abbinamenti
│  ├─ auth.ts                ← login(username, password) → Participant | null
│  ├─ components/
│  │  ├─ LoginForm.tsx
│  │  └─ AssignmentCard.tsx
│  ├─ theme.ts               ← tema MUI natalizio (rosso/verde, font)
│  ├─ App.tsx
│  └─ main.tsx
├─ index.html
└─ package.json
```

## 3. Modello dati (`src/data/participants.ts`)

```ts
export type ParticipantId =
  | 'luca' | 'francesca' | 'daniela' | 'ilaria' | 'rosa' | 'antonio' | 'enrico';

export interface Participant {
  id: ParticipantId;
  name: string;
  username: string;
  password: string;
  photo: string;        // import della foto
  giftTo: ParticipantId;
}
```

| Nome | Username | Password | Regala a |
|---|---|---|---|
| Luca | admin | admin | Ilaria |
| Francesca | fra | puppolina | Rosa |
| Daniela | Dany | loveshark | Enrico |
| Ilaria | Ilaria | lovenature | Francesca |
| Rosa | Rosa | incentivi | Daniela |
| Antonio | Tony | padre | Luca |
| Enrico | Enrico | birdie | Antonio |

Gli abbinamenti sono validi: ognuno regala a una sola persona, ognuno riceve da una sola persona e nessuno
regala a sé stesso. Formano un unico ciclo:
Luca → Ilaria → Francesca → Rosa → Daniela → Enrico → Antonio → Luca.

**Regole di login:** lo username non distingue maiuscole/minuscole e gli spazi iniziali/finali vengono
tolti (`dany` = `Dany`); la password invece le distingue.

## 4. Schermate

### Login (`LoginForm`)
- MUI `Card` centrata (`Container maxWidth="xs"`), titolo "Secret Santa 2026" con icona 🎄/🎁.
- `TextField` Username, `TextField` Password (`type="password"`, icona per mostrarla/nasconderla).
- `Button` "Entra", e il tasto Invio invia il form.
- Credenziali errate → `Alert severity="error"` "Username o password non corretti"; il campo password si svuota.

### Risultato (`AssignmentCard`)
- "Ciao **{nome}**, quest'anno farai il regalo a…"
- Grande `Avatar` con la foto del sorteggiato e il suo nome in `Typography variant="h3"`.
- Facoltativo: il risultato si mostra solo dopo il clic su "Scopri" (animazione MUI `Grow`/`Zoom`) per creare un po' di suspense.
- `Button` "Esci" → svuota `sessionStorage` e torna al login.

## 5. Flusso

```
App
 ├─ all'avvio: legge sessionStorage('santaUser') → currentUser
 ├─ currentUser == null → <LoginForm onLogin={setCurrentUser} />
 └─ currentUser != null → <AssignmentCard giver={currentUser} receiver={byId[giftTo]} onLogout />
```

In `sessionStorage` si salva solo l'`id` dell'utente, non la password.

## 6. Passi di sviluppo

1. **Setup:** `npm create vite@latest . -- --template react-ts`, poi l'installazione di MUI e `npm run dev`.
2. **Foto:** spostare `images/*.jpg` in `src/assets/participants/` e ridimensionarle/comprimerle (~400px) per un caricamento veloce.
3. **Dati:** `participants.ts` con la tabella sopra e una mappa `byId`.
4. **Auth:** funzione pura `login()` in `auth.ts`.
5. **Tema:** `theme.ts` con palette natalizia, `CssBaseline`, eventualmente un font Google (es. "Mountains of Christmas" solo per i titoli).
6. **Componenti:** `LoginForm`, poi `AssignmentCard`, poi la logica in `App`.
7. **Rifinitura:** layout pensato prima per il telefono (lo apriranno quasi tutti da lì), titolo e favicon, piccola animazione di neve in CSS (facoltativa).
8. **Test:** (a) gli abbinamenti sono validi: tutti diversi, nessuno regala a sé stesso, tutti presenti; (b) le credenziali giuste/sbagliate di `login()`; (c) un test RTL: login → compare il nome giusto → logout.
9. **Build e pubblicazione:** `npm run build` → cartella `dist/` statica. Hosting: GitHub Pages / Netlify / Vercel (in `vite.config.ts` serve `base` se si pubblica in una sottocartella).

## 7. Note

- **Sicurezza:** chiunque apra DevTools o il bundle JS vede tutte le password e tutti gli abbinamenti. Va bene per lo studio.
  Volendo, senza backend si può nascondere un po' meglio: salvare solo `hash(username+password)` → nome
  sorteggiato cifrato con la password (Web Crypto). Fuori scope per ora.
- **Da confermare:** la password di Enrico è `birdie` (ho considerato il punto finale come la fine della frase).
