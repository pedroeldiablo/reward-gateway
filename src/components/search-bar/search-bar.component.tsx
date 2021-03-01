import React, { useState } from 'react';

export function SearchBarComponent({
  searchValue,
  setSearchValue,
  setCurrentPage,
}: {
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    setCurrentPage(1);
  };

  const handleClearClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setSearchValue('');
    setCurrentPage(1);
  };

  const shouldDisplayClearButton = searchValue.length > 0;

  const BarStyling = {
    width: '100%',
    background: '#F2F1F9',
    border: 'none',
    padding: '0.5rem',
  };
  return (
    <>
      <input
        style={BarStyling}
        key="random1"
        value={searchValue}
        placeholder={'Search profile labels'}
        onChange={(e) => handleInputChange(e)}
      />
      {shouldDisplayClearButton && (
        <>
          <button onClick={(e) => handleClearClick(e)}>Clear</button>
          <p>Searching {searchValue}</p>{' '}
        </>
      )}
    </>
  );
}
