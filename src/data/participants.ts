import antonio from '../assets/participants/Antonio.jpg';
import daniela from '../assets/participants/Daniela.jpg';
import enrico from '../assets/participants/Enrico.jpg';
import francesca from '../assets/participants/Francesca.jpg';
import ilaria from '../assets/participants/Ilaria.jpg';
import luca from '../assets/participants/Luca.jpg';
import rosa from '../assets/participants/Rosa.jpg';

export type ParticipantId =
  | 'luca'
  | 'francesca'
  | 'daniela'
  | 'ilaria'
  | 'rosa'
  | 'antonio'
  | 'enrico';

export interface Participant {
  id: ParticipantId;
  name: string;
  username: string;
  /** In chiaro: bad practice voluta, è un progetto di studio senza backend. */
  password: string;
  photo: string;
  giftTo: ParticipantId;
}

export const participants: Participant[] = [
  { id: 'luca', name: 'Luca', username: 'admin', password: 'admin', photo: luca, giftTo: 'ilaria' },
  { id: 'francesca', name: 'Francesca', username: 'fra', password: 'puppolina', photo: francesca, giftTo: 'rosa' },
  { id: 'daniela', name: 'Daniela', username: 'Dany', password: 'loveshark', photo: daniela, giftTo: 'enrico' },
  { id: 'ilaria', name: 'Ilaria', username: 'Ilaria', password: 'lovenature', photo: ilaria, giftTo: 'francesca' },
  { id: 'rosa', name: 'Rosa', username: 'Rosa', password: 'incentivi', photo: rosa, giftTo: 'daniela' },
  { id: 'antonio', name: 'Antonio', username: 'Tony', password: 'padre', photo: antonio, giftTo: 'luca' },
  { id: 'enrico', name: 'Enrico', username: 'Enrico', password: 'birdie', photo: enrico, giftTo: 'antonio' },
];

export const byId: Record<ParticipantId, Participant> = Object.fromEntries(
  participants.map((p) => [p.id, p]),
) as Record<ParticipantId, Participant>;

export function isParticipantId(value: unknown): value is ParticipantId {
  return typeof value === 'string' && value in byId;
}
