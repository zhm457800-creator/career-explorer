import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Try immediate scroll
    window.scrollTo(0, 0);
    
    // Also try with a small delay for browsers that restore scroll position
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
      // Ensure the body/html also scrolls to top in case of weird CSS overflow
      document.documentElement.scrollTo(0, 0);
    }, 10);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
