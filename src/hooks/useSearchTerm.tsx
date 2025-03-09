'use client';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useSearchTerm: () => [
  'light' | 'dark',
  string,
  (event: React.ChangeEvent<HTMLInputElement>) => void,
  () => void,
] = () => {
  const router = useRouter();
  const [term, setTerm] = useState('');
  const { theme } = useContext(ThemeContext);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('q');
  const pathName = usePathname();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTerm(event.target.value);
  };

  useEffect(() => {
    setTerm(searchTerm || '');
  }, [searchTerm]);

  const handleSearch = () => {
    const trimmedTerm = term.trim();
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('page', '1');
    currentParams.set('q', trimmedTerm || 'react');

    const newUrl = `${pathName}?${currentParams.toString()}`;
    router.push(newUrl);
  };
  return [theme, term, handleInputChange, handleSearch];
};
