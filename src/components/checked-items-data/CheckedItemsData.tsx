import React, { useContext } from 'react';
import './CheckedItemsData.css';
import { useCheckedItemsData } from './hooks/useCheckedItemsData';
import { ThemeContext } from '../../context/ThemeContext';

export const CheckedItemsData: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const [checkedItems, unCheckItems, csvFileName, csvFile] =
    useCheckedItemsData();

  return (
    <div className={`checked-items-data ${theme}`}>
      <h5>
        {checkedItems.length === 1
          ? '1 item is selected'
          : `${checkedItems.length} items are selected`}
      </h5>
      <div className="checked-items-data-actions">
        <button onClick={unCheckItems}>Unselect all</button>
        <a download={csvFileName} href={csvFile}>
          Download
        </a>
      </div>
    </div>
  );
};
