import React, { useState } from 'react';

const ShowFileButton = () => {
  const [fileContent, setFileContent] = useState('');

  const handleClick = async () => {
    try {
      const response = await fetch('/aws');
      if (response.ok) {
        const file = await response.text();
        setFileContent(file);
      } else {
        console.error('Error retrieving file:', response.status);
      }
    } catch (error) {
      console.error('Error retrieving file:', error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Show File</button>
      <div>{fileContent}</div>
    </div>
  );
};

export default ShowFileButton;