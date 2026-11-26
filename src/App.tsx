import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { AssignmentCard } from './components/AssignmentCard';
import { LoginForm } from './components/LoginForm';
import { Snow } from './components/Snow';
import { clearSession, loadSession, saveSession } from './auth';
import { byId, type Participant } from './data/participants';

export default function App() {
  const [user, setUser] = useState<Participant | null>(loadSession);

  function handleLogin(u: Participant) {
    saveSession(u);
    setUser(u);
  }

  function handleLogout() {
    clearSession();
    setUser(null);
  }

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        py: 4,
        background: 'radial-gradient(ellipse at top, #1f5c3f 0%, #0f2f22 60%, #08190f 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Snow />
      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
        {user ? (
          <AssignmentCard giver={user} receiver={byId[user.giftTo]} onLogout={handleLogout} />
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
      </Container>
    </Box>
  );
}
