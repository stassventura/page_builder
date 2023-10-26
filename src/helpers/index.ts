import { toast } from 'react-toastify';

export const getRandomRowColor = () => {
  const colors = ['F875AA', 'A0E9FF', 'BEADFA', 'FF9B9B', 'FFD966'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return `#${colors[randomIndex]}`;
};

export const getRandomCellColor = () => {
  const colors = ['008170', '9F73AB', '704F4F', '5B4B8A'];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return `#${colors[randomIndex]}`;
};

export const getRandomSentence = () => {
  const sentences = [
    'This could be your ad.',
    'The sun is shining.',
    'Rain is coming soon.',
    'I love programming.',
    'JavaScript is fun.',
    'This is a random sentence.',
  ];
  const randomIndex = Math.floor(Math.random() * sentences.length);
  return sentences[randomIndex];
};

export const generateRandomID = () => {
  let id: number = 0;
  for (let i = 0; i < 12; i++) {
    id = id * 10 + Math.floor(Math.random() * 10);
  }
  return id;
};

export const showError = (msg: string) => {
  toast.error(`${msg}`, {
    position: 'top-right',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
  return;
};
export const showWarning = (msg: string) => {
  toast.warning(`${msg}`, {
    position: 'top-right',
    autoClose: 1000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'colored',
  });
  return;
};
