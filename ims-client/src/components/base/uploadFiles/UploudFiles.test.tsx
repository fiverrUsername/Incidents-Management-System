import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UploadFiles from './UploadFiles';

describe('UploadFiles component', () => {
  test('adds files when dropped in the upload area', () => {
    const setFilesMock = jest.fn();
    // render(<UploadFiles files={[]} setFiles={setFilesMock} />);
    const uploadArea = screen.getByText('Please drag files here');

    fireEvent.drop(uploadArea, {
      dataTransfer: {
        files: [
          new File(['test-file'], 'test-file.txt', { type: 'text/plain' }),
        ],
      },
    });

    expect(setFilesMock).toHaveBeenCalledTimes(1);
    expect(setFilesMock).toHaveBeenCalledWith([
      new File(['test-file'], 'test-file.txt', { type: 'text/plain' }),
    ]);
  });

  test('deletes a file when delete icon is clicked', () => {
    const files = [
      new File(['test-file'], 'test-file.txt', { type: 'text/plain' }),
    ];
    const setFilesMock = jest.fn();
    // render(<UploadFiles files={files} setFiles={setFilesMock} />);
    const deleteIcon = screen.getByTestId('CloseIcon');

    fireEvent.click(deleteIcon);

    expect(setFilesMock).toHaveBeenCalledTimes(1);
    expect(setFilesMock).toHaveBeenCalledWith([]);
  });
});
