import {
  resetItems,
  selectCheckedItems,
} from '../../../store/features/checked-items/checked-items-slice';
import { useDispatch, useSelector } from 'react-redux';
import { GithubRepoItemDto } from '../../../models/github-repo-item-dto.model';

export const useCheckedItemsData = (): [
  GithubRepoItemDto[],
  () => void,
  string,
  string,
] => {
  const dispatch = useDispatch();

  const checkedItems: GithubRepoItemDto[] = useSelector(selectCheckedItems);

  const unCheckItems = () => {
    dispatch(resetItems());
  };

  const getCSVFileName = () => {
    return `${checkedItems.length}_${checkedItems.length === 1 ? 'repo' : 'repos'}.csv`;
  };

  const getCSVFile = () => {
    const blob = new Blob([convertToCSV()], {
      type: 'text/csv;charset=utf-8;',
    });
    return URL.createObjectURL(blob);
  };

  const convertToCSV = () => {
    const headers = `name,owner,url,description,forks`;
    const rows = checkedItems.map((item) => {
      const description = `"${(item.description || '').replace(/"/g, '""')}"`;
      return `${item.name},${item.owner?.login},${item.svn_url},${description},${item.forks}`;
    });

    return [headers, ...rows].join('\n');
  };

  return [checkedItems, unCheckItems, getCSVFileName(), getCSVFile()];
};
