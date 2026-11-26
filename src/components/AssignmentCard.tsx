import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import LogoutIcon from '@mui/icons-material/Logout';
import type { Participant } from '../data/participants';

interface Props {
  giver: Participant;
  receiver: Participant;
  onLogout: () => void;
}

export function AssignmentCard({ giver, receiver, onLogout }: Props) {
  const [revealed, setRevealed] = useState(false);

  return (
    <Card elevation={8}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Stack spacing={3} alignItems="center" textAlign="center">
          <Typography variant="h4" component="h1" color="primary">
            Ciao {giver.name}!
          </Typography>
          <Typography color="text.secondary">Quest'anno farai il regalo a…</Typography>

          {revealed ? (
            <Zoom in>
              <Stack spacing={2} alignItems="center">
                <Avatar
                  src={receiver.photo}
                  alt={receiver.name}
                  sx={{
                    width: 180,
                    height: 180,
                    border: 6,
                    borderColor: 'secondary.main',
                    boxShadow: 6,
                  }}
                />
                <Typography variant="h3" component="p" color="secondary" data-testid="receiver-name">
                  {receiver.name}
                </Typography>
                <Typography color="text.secondary">Mi raccomando: acqua in bocca! 🤫</Typography>
              </Stack>
            </Zoom>
          ) : (
            <Box py={2}>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<CardGiftcardIcon />}
                onClick={() => setRevealed(true)}
                sx={{ px: 4, py: 1.5, fontSize: '1.1rem' }}
              >
                Scopri
              </Button>
            </Box>
          )}

          <Button variant="text" startIcon={<LogoutIcon />} onClick={onLogout}>
            Esci
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
