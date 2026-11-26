import { useState, type FormEvent } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { login } from '../auth';
import type { Participant } from '../data/participants';

interface Props {
  onLogin: (user: Participant) => void;
}

export function LoginForm({ onLogin }: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const user = login(username, password);
    if (user) {
      onLogin(user);
    } else {
      setError(true);
      setPassword('');
    }
  }

  return (
    <Card elevation={8}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={2.5}>
            <Box textAlign="center">
              <Typography fontSize={48} lineHeight={1} aria-hidden>
                🎄
              </Typography>
              <Typography variant="h4" component="h1" color="primary" mt={1}>
                Secret Santa 2026
              </Typography>
              <Typography color="text.secondary" mt={0.5}>
                Accedi per scoprire a chi farai il regalo
              </Typography>
            </Box>

            {error && <Alert severity="error">Username o password non corretti</Alert>}

            <TextField
              label="Username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError(false);
              }}
              autoComplete="username"
              autoCapitalize="none"
              autoFocus
              fullWidth
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              autoComplete="current-password"
              fullWidth
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? 'Nascondi password' : 'Mostra password'}
                        onClick={() => setShowPassword((v) => !v)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={!username.trim() || !password}
            >
              Entra
            </Button>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
