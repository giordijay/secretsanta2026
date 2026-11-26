import { login } from './auth';

describe('login', () => {
  it.each([
    ['admin', 'admin', 'Luca'],
    ['fra', 'puppolina', 'Francesca'],
    ['Dany', 'loveshark', 'Daniela'],
    ['Ilaria', 'lovenature', 'Ilaria'],
    ['Rosa', 'incentivi', 'Rosa'],
    ['Tony', 'padre', 'Antonio'],
    ['Enrico', 'birdie', 'Enrico'],
  ])('%s / %s → %s', (username, password, name) => {
    expect(login(username, password)?.name).toBe(name);
  });

  it('username senza distinzione maiuscole e con spazi tolti', () => {
    expect(login('  dany ', 'loveshark')?.name).toBe('Daniela');
  });

  it('password con distinzione maiuscole', () => {
    expect(login('Dany', 'LoveShark')).toBeNull();
  });

  it('rifiuta credenziali sbagliate', () => {
    expect(login('admin', 'wrong')).toBeNull();
    expect(login('nessuno', 'admin')).toBeNull();
    expect(login('', '')).toBeNull();
  });
});
