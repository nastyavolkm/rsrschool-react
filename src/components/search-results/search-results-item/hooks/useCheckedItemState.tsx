import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import React, { ChangeEvent } from 'react';
import {
  addItems,
  removeItems,
} from '../../../../store/features/checked-items/checked-items-slice';
import { GithubRepoItemDto } from '../../../../models/github-repo-item-dto.model';

export const useCheckedItemState = (
  item: GithubRepoItemDto
): [boolean, (event: ChangeEvent<HTMLInputElement>) => void] => {
  const checkedItems = useSelector(
    (state: RootState) => state.checkedItems.items
  );
  const dispatch = useDispatch();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLElement>) => {
    event.stopPropagation();
    const eventTarget = event.target as HTMLInputElement;
    const isChecked: boolean = eventTarget.checked;
    if (isChecked) {
      dispatch(addItems(item));
    } else {
      dispatch(removeItems(item.id));
    }
  };
  const isItemChecked: boolean = checkedItems.some(
    (checkedItem) => checkedItem.id === item.id
  );

  return [isItemChecked, handleCheckboxChange];
};
