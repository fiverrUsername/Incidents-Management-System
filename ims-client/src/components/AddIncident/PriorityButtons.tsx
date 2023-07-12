


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
interface Props{
  priority:string|null;
  setPriority:React.Dispatch<React.SetStateAction<string|null>>
}
export default function ToggleButtons({priority,setPriority}:Props) {
  
  const handlepriority = (
    event: React.MouseEvent<HTMLElement>,
    newpriority: string | null,
  ) => {
    setPriority(newpriority);
  };
  return (
    <ToggleButtonGroup
      value={priority}
      exclusive
      onChange={handlepriority}
      aria-label="text priority"
      style={{ display: 'flex', gap: '10px' }}
    >
      <ToggleButton value="p0" style={priority === 'p0' ? selectedButtonStyles : buttonStyles}>
        p0
      </ToggleButton>
      <ToggleButton value="p1" style={priority === 'p1' ? selectedButtonStyles : buttonStyles}>
        p1
      </ToggleButton>
      <ToggleButton value="p2" style={priority === 'p2' ? selectedButtonStyles : buttonStyles}>
        p2
      </ToggleButton>
      <ToggleButton value="p3" style={priority === 'p3' ? selectedButtonStyles : buttonStyles}>
        p3
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
