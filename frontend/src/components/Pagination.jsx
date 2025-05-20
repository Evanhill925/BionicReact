import React, { useState, useEffect } from 'react';
import { Pagination as BootstrapPagination } from 'react-bootstrap';
import { useTheme } from '../ThemeContext';

export default function Pagination({ imagesPerPage, totalImages, paginate }) {
  const [activePage, setActivePage] = useState(1);
  const { theme } = useTheme();
  
  // Calculate total number of pages
  const pageCount = Math.ceil(totalImages / imagesPerPage);
  
  // Create an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= pageCount; i++) {
    pageNumbers.push(i);
  }

  // Handle page click
  const handlePageClick = (number) => {
    setActivePage(number);
    paginate(number);
       const element = document.querySelector('.text-center.mb-4');
                  if (element) {
                    element.scrollIntoView({ behavior: "instant"});
                  }
  };

  // Reset active page to 1 when total images changes
  useEffect(() => {
    setActivePage(1);
  }, [totalImages]);

  // Don't render pagination if there's only 1 page
  if (pageCount <= 1) return null;

  // Determine visibility of pagination items based on current page
  const getVisiblePageNumbers = () => {
    const maxPagesToShow = 5;
    
    if (pageCount <= maxPagesToShow) {
      return pageNumbers;
    }
    
    const halfMaxPages = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(1, activePage - halfMaxPages);
    let endPage = Math.min(pageCount, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    return pageNumbers.slice(startPage - 1, endPage);
  };

  const visiblePages = getVisiblePageNumbers();

  return (
    <div className="d-flex justify-content-center my-4">
      <BootstrapPagination className={theme === 'dark' ? 'pagination-dark' : ''}>
        {/* First page button */}
        <BootstrapPagination.First
          onClick={() => handlePageClick(1)}
          disabled={activePage === 1}
        />
        
        {/* Previous page button */}
        <BootstrapPagination.Prev 
          onClick={() => handlePageClick(activePage - 1)}
          disabled={activePage === 1}
        />
        
        {/* Show ellipsis if needed */}
        {visiblePages[0] > 1 && (
          <BootstrapPagination.Ellipsis disabled />
        )}
        
        {/* Page number buttons */}
        {visiblePages.map(number => (
          <BootstrapPagination.Item
            key={number}
            active={number === activePage}
            onClick={() => handlePageClick(number)}
          >
            {number}
          </BootstrapPagination.Item>
        ))}
        
        {/* Show ellipsis if needed */}
        {visiblePages[visiblePages.length - 1] < pageCount && (
          <BootstrapPagination.Ellipsis disabled />
        )}
        
        {/* Next page button */}
        <BootstrapPagination.Next
          onClick={() => handlePageClick(activePage + 1)}
          disabled={activePage === pageCount}
        />
        
        {/* Last page button */}
        <BootstrapPagination.Last
          onClick={() => handlePageClick(pageCount)}
          disabled={activePage === pageCount}
        />
      </BootstrapPagination>
    </div>
  );
}