import { useMemo } from 'react';
import Box from '@mui/material/Box';
import { keyframes } from '@mui/material/styles';

const fall = keyframes`
  from { transform: translate3d(0, -10vh, 0); }
  to   { transform: translate3d(4vw, 110vh, 0); }
`;

const FLAKES = 40;

/** Neve decorativa in puro CSS; disattivata se l'utente preferisce meno animazioni. */
export function Snow() {
  const flakes = useMemo(
    () =>
      Array.from({ length: FLAKES }, (_, i) => ({
        left: Math.random() * 100,
        size: 3 + Math.random() * 5,
        duration: 8 + Math.random() * 10,
        delay: -Math.random() * 18,
        opacity: 0.4 + Math.random() * 0.5,
        key: i,
      })),
    [],
  );

  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        '@media (prefers-reduced-motion: reduce)': { display: 'none' },
      }}
    >
      {flakes.map((f) => (
        <Box
          key={f.key}
          sx={{
            position: 'absolute',
            top: 0,
            left: `${f.left}%`,
            width: f.size,
            height: f.size,
            borderRadius: '50%',
            bgcolor: 'common.white',
            opacity: f.opacity,
            animation: `${fall} ${f.duration}s linear ${f.delay}s infinite`,
          }}
        />
      ))}
    </Box>
  );
}
