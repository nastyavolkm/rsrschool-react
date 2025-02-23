import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const useClickSearchItem = (
  initialElement: HTMLDivElement | null = null
) => {
  const navigate = useNavigate();
  const childRef = useRef(initialElement);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const eventTarget = event.target as HTMLElement;
      if (
        !eventTarget.className.includes('search-item-card') &&
        !eventTarget.className.includes('search-item-details') &&
        !eventTarget.className.includes('search-item-input-checkbox') &&
        !eventTarget.className.includes('search-item-label') &&
        childRef?.current?.contains(eventTarget)
      ) {
        navigate(`/${location.search}`);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate]);
  return childRef;
};
