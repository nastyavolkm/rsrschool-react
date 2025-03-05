import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

export const useClickSearchItem = (
  initialElement: HTMLDivElement | null = null
) => {
  const router = useRouter();
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
        router.push(`/${router.query}`);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [router]);
  return childRef;
};
