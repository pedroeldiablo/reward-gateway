import React from 'react';
import {
  PaginationLink,
  PaginationList,
  PaginationNav,
} from './pagination.styles';

export interface Pagination {
  profilesPerPage?: number;
  totalProfiles?: number;
  paginate: (pageNumber: number) => void;
}

const PaginationComponent = ({
  profilesPerPage,
  totalProfiles,
  paginate,
}: Pagination) => {
  const pageNumbers = [];

  for (
    let i = 1;
    i <= Math.ceil((totalProfiles ?? 1) / (profilesPerPage ?? 1));
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <PaginationNav>
      <PaginationList>
        {pageNumbers.map((number) => (
          <PaginationLink key={number}>
            <a onClick={() => paginate(number)} href="!#">
              {number}
            </a>
          </PaginationLink>
        ))}
      </PaginationList>
    </PaginationNav>
  );
};

export default PaginationComponent;
