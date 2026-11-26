import { byId, participants } from './participants';

describe('abbinamenti', () => {
  it('ha 7 partecipanti con id e username unici', () => {
    expect(participants).toHaveLength(7);
    expect(new Set(participants.map((p) => p.id)).size).toBe(7);
    expect(new Set(participants.map((p) => p.username.toLowerCase())).size).toBe(7);
  });

  it('nessuno regala a sé stesso e ognuno riceve un solo regalo', () => {
    for (const p of participants) {
      expect(p.giftTo).not.toBe(p.id);
      expect(byId[p.giftTo]).toBeDefined();
    }
    expect(new Set(participants.map((p) => p.giftTo)).size).toBe(participants.length);
  });

  it('corrisponde agli abbinamenti stabiliti', () => {
    const pairs = Object.fromEntries(participants.map((p) => [p.name, byId[p.giftTo].name]));
    expect(pairs).toEqual({
      Luca: 'Ilaria',
      Rosa: 'Daniela',
      Antonio: 'Luca',
      Francesca: 'Rosa',
      Enrico: 'Antonio',
      Daniela: 'Enrico',
      Ilaria: 'Francesca',
    });
  });
});
