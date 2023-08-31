import { render } from '@testing-library/react';
import DropDown from './DropDown';

describe('DropDown component', () => {
  const Types1 = [
    { value: 'securing', label: 'a' },
    { value: 'technical', label: 'b' },
    { value: 'comment', label: 'c' },
  ];

  it('renders the select box with options', () => {
    render(<DropDown Types={Types1} onChangeType={() => {}} />);
  });
});
