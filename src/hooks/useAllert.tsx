import { toast } from 'react-toastify';

const useAllert = () => {
  const showError = (msg: string) => {
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
  const showWarning = (msg: string) => {
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
  return {
    showError,
    showWarning,
  };
};

export default useAllert;
