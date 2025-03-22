import { useState } from 'react';
import './Tools.css';

type ToolsProps = {
  regions: string[];
  handleSearch: (searchValue: string) => void;
  handleSort: (type: 'name' | 'population', order: 'asc' | 'desc') => void;
  handleFilterByRegion: (region: string) => void;
  resetFilters: () => void;
};
export const Tools = ({
  regions,
  handleFilterByRegion,
  handleSort,
  handleSearch,
  resetFilters,
}: ToolsProps) => {
  const [nameSort, setNameSort] = useState('desc');
  const [populationSort, setPopulationSort] = useState('desc');
  const [searchValue, setSearchValue] = useState('');
  const [region, setRegion] = useState('default');

  const handleSorting = (type: 'name' | 'population') => () => {
    if (type === 'name') {
      setNameSort(nameSort === 'asc' ? 'desc' : 'asc');
      handleSort('name', nameSort === 'asc' ? 'desc' : 'asc');
    } else {
      setPopulationSort(populationSort === 'asc' ? 'desc' : 'asc');
      handleSort('population', populationSort === 'asc' ? 'desc' : 'asc');
    }
  };

  const handleRegionChange = (value: string) => {
    setRegion(value);
    handleFilterByRegion(value);
  };

  const resetAllFilters = () => {
    setNameSort('asc');
    setPopulationSort('asc');
    setSearchValue('');
    setRegion('default');
    resetFilters();
  };

  return (
    <div className="tools">
      <div className="tools__search">
        <input
          className="tools__search-input"
          value={searchValue}
          onInput={(event) =>
            setSearchValue((event.target as HTMLInputElement).value)
          }
          type="text"
          placeholder="Type and click Search button..."
        />
        <button
          className="tools__search-button"
          onClick={() => handleSearch(searchValue)}
        >
          Search
        </button>
      </div>
      <div className="tools__filter">
        <select
          className="tools__filter-select"
          value={region}
          onChange={(event) => handleRegionChange(event.target.value)}
        >
          <option disabled value="default">
            Select a region...
          </option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
      <div className="tools__sort name">
        <button className="tools__sort-button" onClick={handleSorting('name')}>
          Sort by name
        </button>
      </div>
      <div className="tools__sort population">
        <button
          className="tools__sort-button"
          onClick={handleSorting('population')}
        >
          Sort by population
        </button>
      </div>
      <div className="tools__reset">
        <button className="tools__reset-button" onClick={resetAllFilters}>
          Reset filters
        </button>
      </div>
    </div>
  );
};
