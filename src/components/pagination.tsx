// src/app/admin/users/components/Pagination.tsx
'use client';

import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalResults: number;
  itemsPerPage: number;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalResults,
  itemsPerPage,
}) => {
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalResults);

  return (
    <div className="flex items-center justify-between px-6 py-4 border-t border-neutral-200 bg-white rounded-b-xl">
      <p className="text-sm text-neutral-500">
        Showing {startIndex} to {endIndex} of {totalResults} results
      </p>
      <div className="flex gap-2">
        <button
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm border border-neutral-200 rounded-lg hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => onPageChange(i + 1)}
            className={`px-3 py-2 text-sm rounded-lg ${
              currentPage === i + 1
                ? 'bg-indigo-600 text-white'
                : 'border border-neutral-200 hover:bg-neutral-100'
            }`}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm border border-neutral-200 rounded-lg hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;