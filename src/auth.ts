import { byId, isParticipantId, participants, type Participant } from './data/participants';

const STORAGE_KEY = 'santaUser';

/** Username senza distinzione maiuscole/minuscole e senza spazi ai lati; password esatta. */
export function login(username: string, password: string): Participant | null {
  const wanted = username.trim().toLowerCase();
  return (
    participants.find((p) => p.username.toLowerCase() === wanted && p.password === password) ?? null
  );
}

export function loadSession(): Participant | null {
  try {
    const id = sessionStorage.getItem(STORAGE_KEY);
    return isParticipantId(id) ? byId[id] : null;
  } catch {
    return null;
  }
}

export function saveSession(user: Participant): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, user.id);
  } catch {
    // storage non disponibile (es. navigazione privata): il login vale solo per questa visualizzazione
  }
}

export function clearSession(): void {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignorato
  }
}
