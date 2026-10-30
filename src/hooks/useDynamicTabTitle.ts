import { useEffect } from 'react';

export const useDynamicTabTitle = () => {
  useEffect(() => {
    const originalTitle = document.title;
    let restoreTimeout: number;

    const handleVisibilityChange = () => {
      window.clearTimeout(restoreTimeout);

      if (document.hidden) {
        document.title = '[ 🔴 SIGNAL IDLE // NET//DEV ]';
      } else {
        document.title = '[ 🟢 LINK RESTORED // MUHAMMAD IHSAN ]';
        restoreTimeout = window.setTimeout(() => {
          document.title = originalTitle;
        }, 2200);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      window.clearTimeout(restoreTimeout);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.title = originalTitle;
    };
  }, []);
};
