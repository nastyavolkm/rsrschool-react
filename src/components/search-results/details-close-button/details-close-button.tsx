'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import './details-close-button.css';

export const DetailsCloseButton = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  const searchTerm = searchParams.get('q');

  const changeRoute = () => {
    router.push(`/?page=${page}&q=${searchTerm || ''}`);
  };

  return (
    <button onClick={() => changeRoute()} className="search-item-details-close">
      Close{' '}
    </button>
  );
};
