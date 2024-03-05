import React from 'react';
import ReactPaginate from 'react-paginate';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const Pagination = ({ pageCount, handlePageChange }) => {
  return (
    <div className='sticky-top'>
      <ReactPaginate
        previousLabel={<KeyboardArrowLeftIcon />}
        nextLabel={<KeyboardArrowRightIcon />}
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName={"pagination justify-content-center"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
};

export default Pagination;
