import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

async function doLogin(username: string, password: string) {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/username/i), username);
  await user.type(screen.getByLabelText(/^password/i), password);
  await user.click(screen.getByRole('button', { name: /entra/i }));
  return user;
}

describe('App', () => {
  it('login → scopri → nome giusto → esci', async () => {
    render(<App />);
    const user = await doLogin('Tony', 'padre');

    expect(screen.getByRole('heading', { name: /ciao antonio/i })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: /scopri/i }));
    expect(screen.getByTestId('receiver-name')).toHaveTextContent('Luca');

    await user.click(screen.getByRole('button', { name: /esci/i }));
    expect(screen.getByRole('button', { name: /entra/i })).toBeInTheDocument();
    expect(sessionStorage.getItem('santaUser')).toBeNull();
  });

  it('mostra errore con credenziali sbagliate', async () => {
    render(<App />);
    await doLogin('admin', 'sbagliata');
    expect(screen.getByRole('alert')).toHaveTextContent(/non corretti/i);
  });

  it('ripristina la sessione dopo il ricaricamento', () => {
    sessionStorage.setItem('santaUser', 'rosa');
    render(<App />);
    expect(screen.getByRole('heading', { name: /ciao rosa/i })).toBeInTheDocument();
  });
});
