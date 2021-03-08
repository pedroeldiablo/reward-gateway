import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SearchBarComponent } from './search-bar.component';
import { act } from 'react-dom/test-utils';

it('renders correctly', async () => {
  const searchValue = '';
  const setSearchValue = jest.fn();
  const setCurrentPage = jest.fn();

  const { queryByPlaceholderText, queryByRole } = render(
    <SearchBarComponent
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      setCurrentPage={setCurrentPage}
    />
  );
  expect(queryByPlaceholderText('Search profile labels')).toBeTruthy();
  expect(queryByRole('button')).toBeNull();

  await act(async () => {
    const searchInput = queryByPlaceholderText(
      'Search profile labels'
    ) as HTMLElement;

    fireEvent.change(searchInput, { target: { value: 'test2' } });
  });
  // expect(queryByRole('button')).toBeInTheDocument();
});

it('updates input value on change', async () => {
  let searchValue = 'test';
  const setSearchValue = jest.fn();
  const setCurrentPage = jest.fn();

  const {
    queryByPlaceholderText,
    queryByDisplayValue,
    queryAllByText,
    queryByRole,
  } = render(
    <SearchBarComponent
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      setCurrentPage={setCurrentPage}
    />
  );

  expect(queryByDisplayValue('test')).toBeTruthy();
  expect(queryAllByText('Searching test')).toBeTruthy();
  expect(queryByRole('button')).toBeInTheDocument();

  await act(async () => {
    const searchInput = queryByPlaceholderText(
      'Search profile labels'
    ) as HTMLElement;

    fireEvent.change(searchInput, { target: { value: 'test2' } });
  });

  expect(setSearchValue).toHaveBeenCalled();
  //   expect(queryByPlaceholderText('Search profile labels')).toBeTruthy();
  //   expect(queryByDisplayValue('Search profile labels')).toBeFalsy();
});
