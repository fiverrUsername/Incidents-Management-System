import { render } from '@testing-library/react';
import Attachment  from './attachment';

test('renders MyComponent', () => {
  render(<Attachment attachmentFile="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB9hfMxrD1ywcTDkrqvYu2CPDaDifO3AtmLztsKh4ZqkvS1jZdEQ1DWupA9KJCrQ-wnZI&usqp=CAU"
  />);

});
