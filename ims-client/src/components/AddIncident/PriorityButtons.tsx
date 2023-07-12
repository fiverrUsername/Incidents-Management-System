


import React from 'react';
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

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

export default function ToggleButtons() {
  const [alignment, setAlignment] = React.useState<string | null>();
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
  };
  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
      style={{ display: 'flex', gap: '10px' }}
    >
      <ToggleButton value="left" style={alignment === 'left' ? selectedButtonStyles : buttonStyles}>
        p0
      </ToggleButton>
      <ToggleButton value="center" style={alignment === 'center' ? selectedButtonStyles : buttonStyles}>
        p1
      </ToggleButton>
      <ToggleButton value="right" style={alignment === 'right' ? selectedButtonStyles : buttonStyles}>
        p2
      </ToggleButton>
      <ToggleButton value="justify" style={alignment === 'justify' ? selectedButtonStyles : buttonStyles}>
        p3
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
