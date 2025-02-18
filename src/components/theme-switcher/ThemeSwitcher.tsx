import React, { useContext } from 'react';
import './ThemeSwitcher.css';
import { ThemeContext } from '../../context/ThemeContext';

export const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggleTheme}
      />
      <span className="slider round"></span>
    </label>
  );
};
