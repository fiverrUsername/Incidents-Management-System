import React from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { Priority } from '../../interface/enums';

const buttonStyles: React.CSSProperties = {
  flex: '1',
  height: '56px',
  padding: '16px 20px',
  borderRadius: '10px',
  border: '1px solid #E1E1E1',
  background: '#FFF',
};

const selectedButtonStyles: React.CSSProperties = {
  ...buttonStyles,
  border: '1px solid #2F854F',
  background: 'rgba(47, 133, 79, 0.10)',
};

interface Props {
  priority: Priority;
  setPriority: React.Dispatch<React.SetStateAction<Priority>>;
}

export default function ToggleButtons({ priority, setPriority }: Props) {
  const handlePriority = (
    event: React.MouseEvent<HTMLElement>,
    newPriority: Priority | null,
  ) => {
    if (newPriority !== null) {
      setPriority(newPriority);
    }
  };

  return (
    <ToggleButtonGroup
      value={priority}
      exclusive
      onChange={handlePriority}
      aria-label="text priority"
      style={{ display: 'flex', gap: '10px' }}
    >
      <ToggleButton value={Priority.P0} style={priority === Priority.P0 ? selectedButtonStyles : buttonStyles}>
        p0
      </ToggleButton>
      <ToggleButton value={Priority.P1} style={priority === Priority.P1 ? selectedButtonStyles : buttonStyles}>
        p1
      </ToggleButton>
      <ToggleButton value={Priority.P2} style={priority === Priority.P2 ? selectedButtonStyles : buttonStyles}>
        p2
      </ToggleButton>
      <ToggleButton value={Priority.P3} style={priority === Priority.P3 ? selectedButtonStyles : buttonStyles}>
        p3
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
