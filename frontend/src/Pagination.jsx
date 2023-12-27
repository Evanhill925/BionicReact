import React from "react"
import { useState, useEffect } from "react"

function Pagination({ imagesPerPage, totalImages, paginate }) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalImages / imagesPerPage); i++) {
    pageNumbers.push(i)
  }

  const [activePage, setActivePage] = useState(1)
  const handlePageClick = (number) => {
    setActivePage(number)
  }

  return (
    <div>
      <nav>
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <a
                onClick={(event) => {
                  event.preventDefault();
                  handlePageClick(number)
                  paginate(number)
                }}
                href="!#"className="page-link">{number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Pagination
